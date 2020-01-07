예습 필요

- Negative Margins (o)
- em, rem (o)
- ::before, ::after (o)
- animation (o)
- Transform, Translate (o)
- vw, vh (o)
- box-shadow
- box-sizing
- Media Queries

<<<<<<< Updated upstream
강의 1:25:28 부분, 쓰는 이유.

.list dd {
    overflow: hidden;
} 

강의 1:43:47, box-sizing 부분


=======
>>>>>>> Stashed changes

- 마크다운? 이 뭐람 글이 좀 가독성있게 보이게 하기.
- 카테고리 구현하기 (o)
- 이미지 넣는거 사이즈 조절
- 댓글 css 다듬기
- 모바일 환경 고려하기 (o)
- 배경 이미지 다듬기 (o)
- 로딩바 동그라미 돌아가는 거 구현하기. (spin.js 구현 된건지 안된건지도 모르겠다. 어ㅓ휴)
- 게시물 올라가는거 역순,(o)
- 게시물 페이지 나누기
- 뒤로 가기


<!--
          
       
        </div>
          <div class="comment-content">
          <hr>
          <% if (board.comments !== null) {
              var comment = board.comments;
                for(var i = 0; i < board.comments.length; i++) {%>
                  <p id="author"><%=comment[i].author%></p>
                  <p id="comment-date"><%=comment[i].comment_date%></p>
                  <p id="comment"><%=comment[i].contents%></p>
          <hr>
          <%}}%>
          </div>
          <div class="form">
          <form action="/comment/write" method="post">
            <input type="text" name="id" value="<%=board._id%>" hidden>
              <textarea id="textarea" name="contents"></textarea><br>
            <input id="submit" type="submit" value="댓글남기기">
          </form>
        </div>
        -->
        