package com.example.application.data.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.example.application.data.entity.UpVote;

public interface UpVoteRepository
        extends
            JpaRepository<UpVote, Long>,
            JpaSpecificationExecutor<UpVote> {

}
