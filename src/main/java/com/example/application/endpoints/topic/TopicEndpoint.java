package com.example.application.endpoints.topic;

import com.example.application.data.dto.TopicListItem;
import com.example.application.data.entity.Category;
import com.example.application.data.entity.Topic;
import com.example.application.service.topic.TopicService;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;
import java.util.List;


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

    public Topic createTopic(@Nonnull Topic topic) {
        return topicService.save(topic);
    }

    @Nonnull
    @AnonymousAllowed
    public List<@Nonnull Category> getCategories() {
        return Arrays.asList(Category.values());
    }
}