package org.example.povi.domain.diary.entry.repository;

import org.example.povi.domain.diary.entry.entity.DiaryEntry;
import org.example.povi.domain.diary.type.Visibility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DiaryRepository extends JpaRepository<DiaryEntry, Long> {
    Optional<DiaryEntry> findByIdAndUserId(Long diaryId, Long userId);
    List<DiaryEntry> findByUserIdOrderByCreatedAtDesc(Long userId);

    @Query("""
    select d from DiaryEntry d
    where d.user.id in :followeeIds
      and (
           d.visibility = org.example.povi.domain.diary.type.Visibility.PUBLIC
        or (
             d.visibility = org.example.povi.domain.diary.type.Visibility.FRIEND
         and exists (select 1 from Follow f1
                     where f1.follower.id = :viewerId and f1.following.id = d.user.id)
         and exists (select 1 from Follow f2
                     where f2.follower.id = d.user.id and f2.following.id = :viewerId)
        )
      )
    order by d.createdAt desc
    """)
    List<DiaryEntry> findFollowingFeedForViewer(Long viewerId, List<Long> followeeIds);

    List<DiaryEntry> findByVisibilityOrderByCreatedAtDesc(Visibility visibility);
}
