package org.example.povi.domain.community.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.povi.domain.community.dto.PostCreateRequest;
import org.example.povi.domain.community.dto.PostCreateResponse;
import org.example.povi.domain.community.dto.PostDeleteResponse;
import org.example.povi.domain.community.service.CommunityService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
public class CommunityController {

    private final CommunityService communityService;

    //글작성
    @PostMapping
    public ResponseEntity<PostCreateResponse> createPost(
            @RequestHeader("Authorization") String bearerToken,
            @RequestBody @Valid PostCreateRequest request) {

        String rawToken = bearerToken.replace("Bearer ", "");
        Long uerId = jwtUtil.getUserIdFromToken(rawToken);

        PostCreateResponse response = communityService.createPost(uerId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<PostDeleteResponse> deletePost(
            @RequestHeader("Authorization") String bearerToken,
            @PathVariable Long postId) {

        String rawToken = bearerToken.replace("Bearer ", "");
        Long userId = jwtUtil.getUserIdFromToken(rawToken);

        PostDeleteResponse response = communityService.deletePost(userId, postId);
        return ResponseEntity.ok(response);
    }
}
