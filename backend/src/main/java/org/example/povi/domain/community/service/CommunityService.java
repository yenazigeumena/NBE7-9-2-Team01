package org.example.povi.domain.community.service;

import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.example.povi.domain.community.dto.PostCreateRequest;
import org.example.povi.domain.community.dto.PostCreateResponse;
import org.example.povi.domain.community.entity.CommunityImage;
import org.example.povi.domain.community.entity.CommunityPost;
import org.example.povi.domain.community.repository.CommunityImageRepository;
import org.example.povi.domain.community.repository.CommunityRepository;
import org.example.povi.domain.user.entity.User;
import org.example.povi.domain.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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


}
