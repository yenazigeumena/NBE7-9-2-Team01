package org.example.povi.domain.community.service;

import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.example.povi.domain.community.dto.PostCreateRequest;
import org.example.povi.domain.community.dto.PostCreateResponse;
import org.example.povi.domain.community.dto.PostDeleteResponse;
import org.example.povi.domain.community.entity.CommunityImage;
import org.example.povi.domain.community.entity.CommunityPost;
import org.example.povi.domain.community.repository.CommunityImageRepository;
import org.example.povi.domain.community.repository.CommunityRepository;
import org.example.povi.domain.diary.entry.entity.DiaryImage;
import org.example.povi.domain.user.entity.User;
import org.example.povi.domain.user.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class CommunityService {

    private final CommunityRepository communityRepository;
    private final CommunityImageRepository communityImageRepository;
    private final UserRepository userRepository;

    @Transactional
    public PostCreateResponse createPost(Long userId, PostCreateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        CommunityPost post = request.toEntity(user);
        CommunityPost savedPost = communityRepository.save(post);

        if (request.getImageUrls() != null && !request.getImageUrls().isEmpty()) {
            List<CommunityImage> images = request.getImageUrls().stream()
                    .map(url -> CommunityImage.builder()
                            .imageUrl(url)
                            .communityPost(savedPost) // 저장된 게시글과 연결
                            .build())
                    .collect(Collectors.toList());

            communityImageRepository.saveAll(images); // 이미지 목록 한 번에 저장
        }

        return new PostCreateResponse(savedPost.getId(), "게시글이 성공적으로 생성되었습니다.");

    }

    @Transactional
    public PostDeleteResponse deletePost(Long userId, Long postId) {
        CommunityPost post = communityRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다."));

        if (!post.getUser().getId().equals(userId)) {
            throw new SecurityException("삭제 권한이 없는 사용자입니다.");
        }
        communityRepository.delete(post);

        return new PostDeleteResponse(postId, "게시글이 성공적으로 삭제되었습니다.");
    }


}
