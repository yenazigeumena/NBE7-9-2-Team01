package org.example.povi.domain.diary.service;

import lombok.RequiredArgsConstructor;
import org.example.povi.domain.diary.dto.request.DiaryCreateReq;
import org.example.povi.domain.diary.dto.request.DiaryUpdateReq;
import org.example.povi.domain.diary.dto.response.DiaryCreateRes;
import org.example.povi.domain.diary.dto.response.DiaryUpdateRes;
import org.example.povi.domain.diary.entity.Diary;
import org.example.povi.domain.diary.entity.DiaryImage;
import org.example.povi.domain.diary.repository.DiaryRepository;
import org.example.povi.domain.user.entity.User;
import org.example.povi.domain.user.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class DiaryService {

    private final DiaryRepository diaryRepository;
    private final UserRepository userRepository;


    @Transactional
    public DiaryCreateRes create(DiaryCreateReq req) {
        User user = userRepository.findById(req.getUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        Diary diary = Diary.builder()
                .user(user)
                .title(req.getTitle())
                .content(req.getContent())
                .moodEmoji(req.getMoodEmoji())
                .visibility(req.getVisibility())
                .build();

        if (req.getImageUrls() != null && !req.getImageUrls().isEmpty()) {
            req.getImageUrls().forEach(url -> diary.addImage(new DiaryImage(diary, url)));
        }

        return DiaryCreateRes.from(diaryRepository.save(diary));
    }


}

