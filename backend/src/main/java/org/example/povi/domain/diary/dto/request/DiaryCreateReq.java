package org.example.povi.domain.diary.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.povi.domain.diary.type.MoodEmoji;
import org.example.povi.domain.diary.type.Visibility;

import java.util.List;


@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DiaryCreateReq {

    @NotNull
    private Long userId;

    private String title;
    private String content;
    private MoodEmoji moodEmoji;
    private Visibility visibility;
    private List<String> imageUrls;
}