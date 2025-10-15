package org.example.povi.domain.diary.dto.response;

import lombok.Getter;
import org.example.povi.domain.diary.entity.Diary;
import org.example.povi.domain.diary.entity.DiaryImage;
import org.example.povi.domain.diary.type.MoodEmoji;
import org.example.povi.domain.diary.type.Visibility;


import java.time.LocalDateTime;
import java.util.List;

@Getter
public class DiaryCreateRes {
    private final Long id;
    private final String title;
    private final String content;
    private final MoodEmoji moodEmoji;
    private final Visibility visibility;
    private final List<String> imageUrls;
    private final LocalDateTime createdAt;

    public DiaryCreateRes(Diary d) {
        this.id = d.getId();
        this.title = d.getTitle();
        this.content = d.getContent();
        this.moodEmoji = d.getMoodEmoji();
        this.visibility = d.getVisibility();
        this.imageUrls = d.getImages().stream()
                .map(DiaryImage::getImageUrl)
                .toList();
        this.createdAt = d.getCreatedAt();
    }
}