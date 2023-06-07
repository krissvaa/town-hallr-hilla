package com.example.application.endpoints.topic;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.application.data.dto.TopicListItem;
import com.example.application.data.entity.Category;
import com.example.application.data.entity.Topic;
import com.example.application.service.topic.TopicService;
import com.vaadin.flow.server.auth.AnonymousAllowed;

import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import jakarta.annotation.security.PermitAll;


@Endpoint
public class TopicEndpoint {

    private final TopicService topicService;

    @Autowired
    public TopicEndpoint(TopicService topicService) {
        this.topicService = topicService;
    }

    @Nonnull
    @AnonymousAllowed
    public List<@Nonnull TopicListItem> getTopics() {
        return topicService.getAllTopicsSimplified();
    }

    @Nonnull
    @AnonymousAllowed
    public Topic getTopicById(@Nonnull Long id) {
        return topicService.getTopicById(id);
    }

    @PermitAll
    public TopicListItem createTopic(@Nonnull Topic topic) {
        return topicService.submitNew(topic);
    }

    @Nonnull
    @AnonymousAllowed
    public List<@Nonnull Category> getCategories() {
        return Arrays.asList(Category.values());
    }
}