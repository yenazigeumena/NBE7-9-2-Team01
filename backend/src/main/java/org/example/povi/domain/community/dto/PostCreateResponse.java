package org.example.povi.domain.community.dto;


import lombok.Builder;
import lombok.Getter;

@Getter
public class PostCreateResponse {
    private Long postId;
    private String message;
    @Builder
    public PostCreateResponse(Long postId, String message) {
        this.postId = postId;
        this.message = message;
    }
}

