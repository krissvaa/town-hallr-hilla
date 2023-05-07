package com.example.application.service.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.example.application.data.entity.Vaadiner;

public interface VaadinerRepository
        extends
            JpaRepository<Vaadiner, Long>,
            JpaSpecificationExecutor<Vaadiner> {

}
