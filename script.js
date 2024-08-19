// script.js

// 로그인 폼 제출 처리
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 폼 제출 기본 동작 방지

    const uniqueCode = document.getElementById('uniqueCode').value;

    // 고유 코드 검증 (예: 실제 서버에서 처리해야 함)
    if (uniqueCode === 'VALID_CODE') {
        alert('로그인 성공');
        // 로그인 성공 후 페이지 리다이렉트
        // window.location.href = 'dashboard.html'; // 예시
    } else {
        alert('유효하지 않은 고유 코드입니다.');
    }
});

// 발급받기 모달 열기
document.getElementById('getCodeButton').addEventListener('click', function() {
    document.getElementById('codeModal').style.display = 'block';
});

// 문의하기 모달 열기 (예시)
document.getElementById('contactButton').addEventListener('click', function() {
    document.getElementById('contactModal').style.display = 'block';
});

// 모달 닫기
document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('codeModal').style.display = 'none';
});

document.getElementById('closeContactModal').addEventListener('click', function() {
    document.getElementById('contactModal').style.display = 'none';
});

// 클릭 외부로 모달 닫기
window.onclick = function(event) {
    if (event.target === document.getElementById('codeModal')) {
        document.getElementById('codeModal').style.display = 'none';
    }
    if (event.target === document.getElementById('contactModal')) {
        document.getElementById('contactModal').style.display = 'none';
    }
}
