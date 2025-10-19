package org.example.povi.domain.community.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PostDeleteResponse {
    private Long postId;
    private String message;

}
