package org.example.povi.domain.diary.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.povi.global.entity.BaseEntity;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "diary_images")
public class DiaryImage extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "diary_id", nullable = false)
    private Diary diary;

    @Column(name = "image_url", columnDefinition = "TEXT")
    private String imageUrl;

    public DiaryImage(Diary diary, String imageUrl) {
        this.diary = diary;
        this.imageUrl = imageUrl;
    }

    void setDiary(Diary diary) {
        this.diary = diary;
    }
}
