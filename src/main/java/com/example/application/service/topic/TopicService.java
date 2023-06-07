package com.example.application.service.topic;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.application.data.dto.TopicListItem;
import com.example.application.data.entity.Category;
import com.example.application.data.entity.Comment;
import com.example.application.data.entity.Status;
import com.example.application.data.entity.Topic;
import com.example.application.data.entity.UpVote;
import com.example.application.data.entity.User;
import com.example.application.security.AuthenticatedUser;
import com.example.application.service.user.UserRepository;

import jakarta.persistence.EntityNotFoundException;


@Service
@Transactional
public class TopicService {
    private static final int MAX_VOTES = 5;
    private final TopicRepository topicRepository;
    private AuthenticatedUser authenticatedUser;
    private UserRepository userRepository;
    private final UpVoteRepository upVoteRepository;
    private final CommentRepository commentRepository;

    @Autowired
    public TopicService(TopicRepository topicRepository,
            UpVoteRepository upVoteRepository,
            CommentRepository commentRepository,
            AuthenticatedUser authenticatedUser,
            UserRepository userRepository) {
        this.topicRepository = topicRepository;
        this.upVoteRepository = upVoteRepository;
        this.commentRepository = commentRepository;
        this.authenticatedUser = authenticatedUser;
        this.userRepository = userRepository;
    }

    public List<Topic> listAll() {
        return topicRepository.findAll();
    }

    public List<TopicListItem> searchTopics(Optional<String> searchTerm, Optional<Category> category) {
        return listAll().stream().filter(topic -> {
            if (searchTerm.isPresent()) {
                if (category.isPresent()) {
                    return (topic.getTitle().toLowerCase().contains(searchTerm.get().toLowerCase())
                            || topic.getDescription().toLowerCase().contains(searchTerm.get()))
                            && topic.getCategory().equals(category.get());
                } else {
                    return topic.getTitle().toLowerCase().contains(searchTerm.get().toLowerCase())
                            || topic.getDescription().toLowerCase().contains(searchTerm.get().toLowerCase());
                }
            } else if (category.isPresent()) {
                return category.get().equals(topic.getCategory());
            }
            return true;
        }).map(this::topicEntityToListItem).toList();
    }

    public List<TopicListItem> getAllTopicsSimplified() {
        var topics = topicRepository.findAll();
        return topics.stream().map(this::topicEntityToListItem).toList();
    }

    private TopicListItem topicEntityToListItem(Topic topic) {
        var topicListItem = new TopicListItem();
        topicListItem.setId(topic.getId());
        topicListItem.setUpvoteCount(topic.getUpVotes() != null ?
                topic.getUpVotes().size() : 0);
        topicListItem.setTitle(topic.getTitle());
        topicListItem.setDescription(topic.getDescription());
        topicListItem.setCommentCount(topic.getUpVotes() != null ?
                topic.getComments().size() : 0);
        topicListItem.setStatus(topic.getStatus());
        topicListItem.setCategory(topic.getCategory());
        topicListItem.setAnswerer(topic.getAnswerer());
        return topicListItem;
    }

    public Topic save(Topic topic) {
        topic.setSubmitter(getCurrentUser());
        return topicRepository.save(topic);
    }

    public void delete(Topic topic) {
        topicRepository.delete(topic);
    }

    public TopicListItem submitNew(Topic topic) {
        final User submitter = getCurrentUser();
        // refresh the User from the DB
        Optional<User> refreshedUser = userRepository.findById(submitter.getId());
        if (refreshedUser.isEmpty()) {
            throw new EntityNotFoundException("User not found");
        }

        topic.setStatus(Status.NEW);
        topic.setSubmitter(refreshedUser.get());

        // save the topic
        Topic savedTopic = save(topic);

        // update User
        refreshedUser.get().getSubmittedTopics().add(savedTopic);
        userRepository.save(refreshedUser.get());

        return topicEntityToListItem(savedTopic);
    }

    public Topic upvote(Topic topic) {
        final User voter = getCurrentUser();

        // create a new vote
        UpVote upVote = new UpVote();
        upVote.setTimestamp(LocalDate.now());
        upVote.setVoter(voter);

        // refresh the topic from the DB
        Optional<Topic> byId = topicRepository.findById(topic.getId());
        if (byId.isPresent()) {
            Topic topicToBeSaved = byId.get();
            topicToBeSaved.getUpVotes().add(upVote);

            // refresh the User from the DB
            final User refreshedUser;
            Optional<User> optionalUser = userRepository.findById(voter.getId());
            if (optionalUser.isPresent()) {
                refreshedUser = optionalUser.get();
                if (refreshedUser.getUpVotes().size() == MAX_VOTES) {
                    throw new IllegalArgumentException("All votes already used");
                }
            } else {
                throw new EntityNotFoundException("User not found");
            }

            // save the vote
            upVote.setTopic(topicToBeSaved);
            UpVote savedVote = upVoteRepository.save(upVote);

            // update User
            refreshedUser.getUpVotes().add(savedVote);
            userRepository.save(refreshedUser);

            // update the topic
            return save(topicToBeSaved);
        } else {
            throw new EntityNotFoundException("Topic not found");
        }
    }

    public Topic assign(TopicListItem topic, User assignee) {
        // refresh the topic from the DB
        Optional<Topic> byId = topicRepository.findById(topic.getId());
        if (byId.isPresent()) {
            Topic topicToBeSaved = byId.get();
            topicToBeSaved.setStatus(Status.ASSIGNED);
            topicToBeSaved.setAnswerer(assignee);

            // update the topic
            return save(topicToBeSaved);
        } else {
            throw new EntityNotFoundException("Topic not found");
        }
    }

    public Topic answered(TopicListItem topic) {
        // refresh the topic from the DB
        Optional<Topic> byId = topicRepository.findById(topic.getId());
        if (byId.isPresent()) {
            Topic topicToBeSaved = byId.get();
            topicToBeSaved.setStatus(Status.ANSWERED);

            // update the topic
            return save(topicToBeSaved);
        } else {
            throw new EntityNotFoundException("Topic not found");
        }
    }

    public Topic getTopicById(Long id) {
        return topicRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No Topic found with id: " + id));
    }

    public TopicListItem getTopicItemById(Long id) {
        final Topic topic = getTopicById(id);
        return topicEntityToListItem(topic);
    }

    public UpVote saveUpVote(Long topicId) {
        Topic topic = getTopicById(topicId);
        UpVote upVote = new UpVote();
        upVote.setTopic(topic);
        upVote.setVoter(getCurrentUser());

        UpVote saved = upVoteRepository.save(upVote);
        topic.getUpVotes().add(saved);
        topicRepository.save(topic);
        return saved;
    }

    public void removeUpVote(UpVote upVote) {
        Topic topic = upVote.getTopic();
        upVoteRepository.delete(upVote);
        topic.getUpVotes().remove(upVote);
        topicRepository.save(topic);
    }

    public UpVote getUpVote(Long topicId) {
        Topic topic = getTopicById(topicId);
        UpVote upVote = new UpVote();
        upVote.setTopic(topic);
        upVote.setVoter(getCurrentUser());
        return upVoteRepository.findOne(Example.of(upVote)).orElse(null);
    }

    public User getCurrentUser() {
        return authenticatedUser.get().orElseThrow(() -> new IllegalStateException("No user auth"));
    }

    public List<Comment> getCommentsForTopic(Long topicId) {
        return commentRepository.findAll((root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("topic"), topicId));
    }

    public Long saveComment(Comment comment) {
        var commentId = commentRepository.save(comment).getId();
        var topic = comment.getTopic();
        topic.getComments().add(comment);
        save(topic);
        return commentId;
    }
}
