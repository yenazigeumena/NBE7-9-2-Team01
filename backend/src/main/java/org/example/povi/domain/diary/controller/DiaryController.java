package org.example.povi.domain.diary.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.povi.domain.diary.dto.request.DiaryCreateReq;
import org.example.povi.domain.diary.dto.request.DiaryUpdateReq;
import org.example.povi.domain.diary.dto.response.DiaryCreateRes;
import org.example.povi.domain.diary.dto.response.DiaryUpdateRes;
import org.example.povi.domain.diary.service.DiaryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/diaries")
public class DiaryController {

    private final DiaryService diaryService;

    @PostMapping
    @Operation(summary = "다이어리 생성")
    public ResponseEntity<DiaryCreateRes> createDiary(@RequestBody @Valid DiaryCreateReq req) {
        DiaryCreateRes response = diaryService.create(req);
        return ResponseEntity.ok(response);
    }

}
