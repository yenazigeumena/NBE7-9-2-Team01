package org.example.povi.domain.community.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.List;
import lombok.Getter;
import org.example.povi.domain.community.entity.CommunityEmoticon;
import org.example.povi.domain.community.entity.CommunityPost;
import org.example.povi.domain.user.entity.User;


@Getter
public class PostCreateRequest {
    @NotBlank(message = "제목은 필수 입력 항목입니다.")
    @Size(max = 50, message = "제목은 50자 초과할 수 없습니다.")
    private String title;

    @NotBlank(message = "내용은 필수 입력 항목입니다.")
    @Size(max = 1000, message = "내용은 1000자 초과할 수 없습니다.")
    private String content;

    private Long userId;
    private CommunityEmoticon emoticon;
    private List<String> imageUrls;

    public CommunityPost toEntity(User user) {
        return CommunityPost.builder()
                .user(user)
                .title(title)
                .content(content)
                .emoticon(emoticon)
                .build();
    }
}
