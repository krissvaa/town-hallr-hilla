package com.example.application.data.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.example.application.data.entity.Comment;

public interface CommentRepository
        extends
            JpaRepository<Comment, Long>,
            JpaSpecificationExecutor<Comment> {

}
