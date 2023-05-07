package com.example.application.service.topic;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.example.application.data.entity.Topic;

public interface TopicRepository
        extends
            JpaRepository<Topic, Long>,
            JpaSpecificationExecutor<Topic> {

}
