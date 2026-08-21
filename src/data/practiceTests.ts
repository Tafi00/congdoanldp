export type PracticeQuestion = {
  prompt: string;
  answers: [string, string, string, string];
  correct: number;
  explanation: string;
};

export const practiceQuestions: Record<string, PracticeQuestion[]> = {
  "nghiep-vu-cong-doan-01": [
    {
      prompt: "Nội dung nào thuộc chức năng đại diện của tổ chức công đoàn?",
      answers: [
        "Bảo vệ quyền và lợi ích hợp pháp của người lao động",
        "Quản lý ngân sách nhà nước",
        "Cấp văn bằng đào tạo",
        "Ban hành chương trình giáo dục",
      ],
      correct: 0,
      explanation:
        "Công đoàn đại diện, chăm lo và bảo vệ quyền, lợi ích hợp pháp, chính đáng của người lao động.",
    },
    {
      prompt: "Cơ quan lãnh đạo cao nhất của công đoàn mỗi cấp là gì?",
      answers: [
        "Đại hội công đoàn cấp đó",
        "Ban thanh tra nhân dân",
        "Cơ quan chuyên môn",
        "Hội nghị người lao động",
      ],
      correct: 0,
      explanation:
        "Đại hội công đoàn cấp đó là cơ quan lãnh đạo cao nhất của công đoàn cùng cấp.",
    },
    {
      prompt: "Hoạt động nào thể hiện chức năng chăm lo của công đoàn?",
      answers: [
        "Thăm hỏi đoàn viên có hoàn cảnh khó khăn",
        "Cấp giấy phép kinh doanh",
        "Thu thuế thu nhập",
        "Tổ chức thi tuyển công chức",
      ],
      correct: 0,
      explanation:
        "Thăm hỏi, hỗ trợ đoàn viên khó khăn là hoạt động chăm lo trực tiếp của tổ chức công đoàn.",
    },
    {
      prompt: "Đoàn viên công đoàn có quyền nào sau đây?",
      answers: [
        "Tham gia thảo luận và biểu quyết công việc của công đoàn",
        "Tự ban hành quy định pháp luật",
        "Quyết định ngân sách nhà nước",
        "Cấp chứng chỉ nghề",
      ],
      correct: 0,
      explanation:
        "Đoàn viên được tham gia thảo luận, đề xuất và biểu quyết công việc của tổ chức công đoàn.",
    },
    {
      prompt: "Đối thoại tại nơi làm việc nhằm mục đích chính nào?",
      answers: [
        "Tăng cường chia sẻ thông tin và hiểu biết giữa các bên",
        "Thay thế hợp đồng lao động",
        "Bãi bỏ nội quy lao động",
        "Chuyển quyền quản lý doanh nghiệp",
      ],
      correct: 0,
      explanation:
        "Đối thoại giúp các bên chia sẻ thông tin, tăng cường hiểu biết và cùng giải quyết vấn đề tại nơi làm việc.",
    },
  ],
  "nghiep-vu-su-pham-01": [
    {
      prompt: "Mục tiêu bài học cần mô tả điều gì?",
      answers: [
        "Kết quả người học có thể đạt được",
        "Số trang giáo trình",
        "Số lượng bàn ghế",
        "Thời gian nghỉ giải lao",
      ],
      correct: 0,
      explanation:
        "Mục tiêu bài học mô tả kết quả kiến thức, kỹ năng hoặc năng lực mà người học cần đạt.",
    },
    {
      prompt: "Đánh giá thường xuyên được thực hiện chủ yếu để làm gì?",
      answers: [
        "Cung cấp phản hồi và điều chỉnh việc học",
        "Chỉ để xếp hạng cuối khóa",
        "Thay thế toàn bộ hoạt động dạy",
        "Giảm thời lượng môn học",
      ],
      correct: 0,
      explanation:
        "Đánh giá thường xuyên giúp giáo viên và người học nhận phản hồi để điều chỉnh kịp thời.",
    },
    {
      prompt: "Phương pháp nào khuyến khích người học chủ động trao đổi?",
      answers: [
        "Thảo luận nhóm",
        "Đọc chép liên tục",
        "Chỉ nghe giảng",
        "Học thuộc không phản hồi",
      ],
      correct: 0,
      explanation:
        "Thảo luận nhóm tạo cơ hội cho người học hợp tác, trình bày và phản biện ý kiến.",
    },
    {
      prompt: "Một câu hỏi kiểm tra tốt cần bảo đảm yêu cầu nào?",
      answers: [
        "Rõ ràng, phù hợp mục tiêu học tập",
        "Càng dài càng tốt",
        "Không liên quan nội dung",
        "Chỉ có từ ngữ chuyên biệt khó hiểu",
      ],
      correct: 0,
      explanation:
        "Câu hỏi cần rõ ràng và đo đúng mục tiêu, nội dung đã được tổ chức dạy học.",
    },
    {
      prompt: "Phản hồi hiệu quả cho người học nên như thế nào?",
      answers: [
        "Cụ thể, kịp thời và có hướng cải thiện",
        "Chỉ nêu điểm số",
        "Đưa ra rất muộn",
        "Không chỉ ra điểm cần điều chỉnh",
      ],
      correct: 0,
      explanation:
        "Phản hồi cụ thể, kịp thời giúp người học biết điểm mạnh và cách cải thiện kết quả.",
    },
  ],
  "quan-ly-giao-duc-01": [
    {
      prompt: "Bước đầu tiên khi xây dựng kế hoạch giáo dục là gì?",
      answers: [
        "Phân tích bối cảnh và xác định mục tiêu",
        "Mua sắm thiết bị",
        "Tổng kết thi đua",
        "Phân công trực tuần",
      ],
      correct: 0,
      explanation:
        "Kế hoạch cần bắt đầu từ phân tích thực trạng, bối cảnh và xác định mục tiêu phù hợp.",
    },
    {
      prompt: "Dữ liệu trong quản lý giáo dục được sử dụng chủ yếu để làm gì?",
      answers: [
        "Hỗ trợ ra quyết định",
        "Thay thế hoàn toàn con người",
        "Tăng thủ tục giấy tờ",
        "Giảm trao đổi chuyên môn",
      ],
      correct: 0,
      explanation:
        "Dữ liệu tin cậy là căn cứ giúp nhà quản lý theo dõi, đánh giá và ra quyết định.",
    },
    {
      prompt: "Phân công nhiệm vụ hiệu quả cần dựa trên yếu tố nào?",
      answers: [
        "Năng lực và trách nhiệm của từng cá nhân",
        "Ngẫu nhiên hoàn toàn",
        "Chỉ dựa vào thâm niên",
        "Không cần mô tả kết quả",
      ],
      correct: 0,
      explanation:
        "Phân công cần phù hợp năng lực, trách nhiệm và có kết quả đầu ra rõ ràng.",
    },
    {
      prompt: "Kiểm tra nội bộ trường học nhằm mục đích chính nào?",
      answers: [
        "Cải tiến chất lượng hoạt động",
        "Tăng hình thức báo cáo",
        "Thay thế công tác giảng dạy",
        "Chỉ tìm lỗi cá nhân",
      ],
      correct: 0,
      explanation:
        "Kiểm tra nội bộ giúp nhận diện điểm mạnh, hạn chế và đề xuất biện pháp cải tiến chất lượng.",
    },
    {
      prompt: "Một chỉ số theo dõi tốt cần có đặc điểm nào?",
      answers: [
        "Cụ thể và có thể đo lường",
        "Không liên quan mục tiêu",
        "Thay đổi tùy ý",
        "Không cần nguồn dữ liệu",
      ],
      correct: 0,
      explanation:
        "Chỉ số cần cụ thể, đo lường được và gắn trực tiếp với mục tiêu quản lý.",
    },
  ],
};

export function getPracticeQuestions(testId: string) {
  return (practiceQuestions[testId] ?? []).map((question, index) => {
    const shift = index % question.answers.length;
    return {
      ...question,
      answers: [
        ...question.answers.slice(shift),
        ...question.answers.slice(0, shift),
      ] as PracticeQuestion["answers"],
      correct:
        (question.correct - shift + question.answers.length) %
        question.answers.length,
    };
  });
}
