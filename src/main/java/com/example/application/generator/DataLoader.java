package com.example.application.generator;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.example.application.data.entity.Status;
import com.example.application.data.entity.Topic;
import com.example.application.data.entity.UpVote;
import com.example.application.data.entity.User;
import com.example.application.data.entity.VaadinRole;
import com.example.application.service.topic.TopicRepository;
import com.example.application.service.topic.UpVoteRepository;
import com.example.application.service.user.UserRepository;


public class DataLoader {
    private static final Logger LOG = LoggerFactory.getLogger(DataLoader.class);

    private final TopicRepository topicRepository;
    private final UpVoteRepository upVoteRepository;
    private final UserRepository userRepository;

    // TODO move to data.sql - no need for data loader

    public DataLoader(TopicRepository topicRepository, UpVoteRepository upVoteRepository,
            UserRepository userRepository) {
        this.topicRepository = topicRepository;
        this.upVoteRepository = upVoteRepository;
        this.userRepository = userRepository;

        LOG.info("-------------------------------");
        LOG.info("Creating initial data");
        createTestUsers();
        createTestData();
        LOG.info("Topics created {}", topicRepository.count());
        LOG.info("-------------------------------");
    }

    private void createTestUsers() {
        updateUser(1L, VaadinRole.HERD_MEMBER);
        updateUser(2L, VaadinRole.HERD_LEADER);
    }

    private void updateUser(final Long id, final VaadinRole vaadinRole) {
        final Optional<User> userById = userRepository.findById(id);
        if (userById.isPresent()) {
            final User user = userById.get();
            user.setVaadinRole(vaadinRole);
            userRepository.save(user);
        }
    }

    private List<Topic> createTestData() {
        var topicList = new ArrayList<Topic>();
        topicList.add(
                createListItem(1, "What happened?", "Everything was according to plan, but now it isn't. What happened?", 25));
        topicList.add(createListItem(2, "Why would you do such a thing?", "Everyone told you not to, but you did. Why?", 1));
        topicList.add(createListItem(3, "Where is this going?",
                "I feel lost, I'm not sure where I am and where this ship is headed to. Can you help me understand?", 10));
        topicList.add(createListItem(4, "What now?", "What is the plan to resolve the problem of there existing problems?", 8));
        topicList.add(createListItem(5, "I am Too Short!!!",
                "Please help me grow.\n I want to be a big boi, but nothing seems to work.", 2));
        return topicList;
    }

    private Topic createListItem(long id, String title, String description, int upVoteCount) {
        var topic = new Topic();
        topic.setId(id);
        topic.setTitle(title);
        topic.setStatus(Status.NEW);
        topic.setDescription(description);

        Optional<User> user = userRepository.findById(2L);
        if (user.isEmpty()) {
            LOG.error("User not created with id 1002!");
            return null;
        }
        topic.setSubmitter(user.get());
        topic.setAnswerer(user.get());

        List<UpVote> upVotes = new ArrayList<>();
        for (int i = 0; i < upVoteCount; i++) {
            UpVote upVote = new UpVote();
            upVote.setTimestamp(LocalDate.now());
            upVote.setVoter(user.get());
            upVotes.add(upVote);
        }
        upVoteRepository.saveAll(upVotes);

        topic.setUpVotes(upVotes);

        topicRepository.save(topic);
        return topic;
    }
}
