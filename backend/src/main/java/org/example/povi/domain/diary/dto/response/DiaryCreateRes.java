package org.example.povi.domain.diary.dto.response;

import lombok.Builder;
import lombok.Getter;
import org.example.povi.domain.diary.entity.Diary;
import org.example.povi.domain.diary.entity.DiaryImage;
import org.example.povi.domain.diary.type.MoodEmoji;
import org.example.povi.domain.diary.type.Visibility;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class DiaryCreateRes {
    private final Long id;
    private final String title;
    private final String content;
    private final MoodEmoji moodEmoji;
    private final Visibility visibility;
    private final List<String> imageUrls;
    private final LocalDateTime createdAt;

    public static DiaryCreateRes from(Diary diary) {
        return DiaryCreateRes.builder()
                .diaryId(diary.getId())
                .title(diary.getTitle())
                .content(diary.getContent())
                .moodEmoji(diary.getMoodEmoji())
                .visibility(diary.getVisibility())
                .imageUrls(diary.getImages().stream()
                        .map(DiaryImage::getImageUrl)
                        .toList())
                .createdAt(diary.getCreatedAt())
                .build();
    }
}