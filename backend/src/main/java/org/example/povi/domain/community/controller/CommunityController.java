package org.example.povi.domain.community.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.povi.domain.community.dto.PostCreateRequest;
import org.example.povi.domain.community.dto.PostCreateResponse;
import org.example.povi.domain.community.service.CommunityService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
public class CommunityController {

    private final CommunityService communityService;

    //글작성
    @PostMapping
    public ResponseEntity<PostCreateResponse> createPost(@RequestBody @Valid PostCreateRequest request) {
        PostCreateResponse response = communityService.createPost(request.getUserId(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

}
