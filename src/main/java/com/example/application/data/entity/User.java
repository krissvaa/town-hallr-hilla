package com.example.application.data.entity;

import java.util.List;
import java.util.Set;

import com.example.application.data.Role;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import dev.hilla.Nonnull;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;


@Entity
@Table(name = "application_user")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class User extends AbstractEntity {

    @Nonnull
    private String username;
    @Nonnull
    private String name;
    @JsonIgnore
    private String hashedPassword;
    @Enumerated(EnumType.STRING)
    @ElementCollection(fetch = FetchType.EAGER)
    @Nonnull
    private Set<Role> roles;
    @Lob
    @Column(length = 1000000)
    private byte @Nonnull [] profilePicture;

    @Enumerated(EnumType.STRING)
    private VaadinRole vaadinRole;
    @OneToMany
    private List<Topic> submittedTopics;
    @OneToMany
    private List<Topic> answererForTopics;
    @OneToMany
    private List<Comment> comments;
    @OneToMany
    private List<UpVote> upVotes;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHashedPassword() {
        return hashedPassword;
    }

    public void setHashedPassword(String hashedPassword) {
        this.hashedPassword = hashedPassword;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public byte @Nonnull [] getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(byte @Nonnull [] profilePicture) {
        this.profilePicture = profilePicture;
    }

    public VaadinRole getVaadinRole() {
        return vaadinRole;
    }

    public void setVaadinRole(final VaadinRole vaadinRole) {
        this.vaadinRole = vaadinRole;
    }

    public List<Topic> getSubmittedTopics() {
        return submittedTopics;
    }

    public void setSubmittedTopics(final List<Topic> submittedTopics) {
        this.submittedTopics = submittedTopics;
    }

    public List<Topic> getAnswererForTopics() {
        return answererForTopics;
    }

    public void setAnswererForTopics(final List<Topic> answererForTopics) {
        this.answererForTopics = answererForTopics;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(final List<Comment> comments) {
        this.comments = comments;
    }

    public List<UpVote> getUpVotes() {
        return upVotes;
    }

    public void setUpVotes(final List<UpVote> upVotes) {
        this.upVotes = upVotes;
    }
}
