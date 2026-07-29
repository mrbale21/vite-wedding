import React, { useState, useEffect } from "react";
import {
  Send,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Check,
  X,
  Users,
} from "lucide-react";
import SwayingTree from "../components/SwayingTree";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

interface Comment {
  id: string;
  name: string;
  message: string;
  date: Date;
  attendance: "hadir" | "tidak-hadir";
}

const COMMENTS_COLLECTION = "comments-2";

const formatDate = (date: Date) => {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Hari ini";
  if (diffDays === 1) return "1 hari lalu";
  if (diffDays < 7) return `${diffDays} hari lalu`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} minggu lalu`;
  return `${Math.floor(diffDays / 30)} bulan lalu`;
};

const avatarColors = [
  "bg-[#4A6FA5]",
  "bg-[#8FA8C7]",
  "bg-[#A67C52]",
  "bg-[#C4A882]",
  "bg-[#1E3A5F]",
  "bg-[#7A9BCC]",
];

const generateAvatarClass = (name: string) => {
  const index = name.length % avatarColors.length;
  return `${avatarColors[index]} text-white font-semibold flex items-center justify-center rounded-full w-10 h-10 md:w-12 md:h-12 text-base md:text-lg flex-shrink-0`;
};

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newComment, setNewComment] = useState({ name: "", message: "" });
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [tempComment, setTempComment] = useState<Omit<
    Comment,
    "id" | "attendance"
  > | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const commentsPerPage = 3;
  const totalPages = Math.ceil(comments.length / commentsPerPage);
  const startIndex = (currentPage - 1) * commentsPerPage;
  const currentComments = comments.slice(
    startIndex,
    startIndex + commentsPerPage,
  );

  useEffect(() => {
    const q = query(
      collection(db, COMMENTS_COLLECTION),
      orderBy("date", "desc"),
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Comment[] = snapshot.docs.map((doc) => {
        const d = doc.data();
        return {
          id: doc.id,
          name: d.name,
          message: d.message,
          date: d.date.toDate(),
          attendance: d.attendance,
        };
      });
      setComments(data);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.name.trim() || !newComment.message.trim()) return;
    setTempComment({
      name: newComment.name,
      message: newComment.message,
      date: new Date(),
    });
    setShowAttendanceModal(true);
  };

  const handleAttendanceSelection = async (
    attendance: "hadir" | "tidak-hadir",
  ) => {
    if (!tempComment) return;
    setIsSubmitting(true);

    await addDoc(collection(db, COMMENTS_COLLECTION), {
      ...tempComment,
      attendance,
      date: Timestamp.fromDate(tempComment.date),
    });

    setTempComment(null);
    setShowAttendanceModal(false);
    setIsSubmitting(false);
    setNewComment({ name: "", message: "" });
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const attendingCount = comments.filter(
    (c) => c.attendance === "hadir",
  ).length;
  const notAttendingCount = comments.filter(
    (c) => c.attendance === "tidak-hadir",
  ).length;

  return (
    <div className="px-3 sm:px-4 pb-16 md:pb-20">
      <div className="max-w-4xl mx-auto p-3 sm:p-4 md:p-6 bg-gradient-to-br from-primary to-blue-pale rounded-2xl min-h-screen relative overflow-hidden">
        <div className="absolute -top-2 right-4 z-10 pointer-events-none opacity-25">
          <SwayingTree src="/assets/images/scene_bird.webp" className="w-[50px] md:w-[70px]" />
        </div>

        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h2
              data-aos="fade-left"
              data-aos-delay={10}
              className="text-3xl sm:text-4xl font-bold text-white font-Sacramneto my-6 sm:my-10"
            >
              Ucapan & Doa
            </h2>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay={10}
            className="flex justify-center gap-3 sm:gap-6 mb-6 flex-wrap"
          >
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full">
              <span className="text-white/90 font-semibold text-sm sm:text-base">
                {attendingCount + notAttendingCount} Ucapan
              </span>
            </div>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay={10}
          className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-100"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Berikan Ucapan Anda
          </h3>
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <input
              type="text"
              placeholder="Nama Anda"
              value={newComment.name}
              onChange={(e) =>
                setNewComment({ ...newComment, name: e.target.value })
              }
              className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary/30 transition-all text-sm sm:text-base"
              required
            />
            <textarea
              placeholder="Tulis ucapan atau doa Anda..."
              value={newComment.message}
              onChange={(e) =>
                setNewComment({ ...newComment, message: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary/30 transition-all resize-none text-sm sm:text-base"
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-neutral text-white py-2.5 sm:py-3 px-6 rounded-lg hover:from-neutral hover:to-primary transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-sm sm:text-base"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" /> Kirim Ucapan
            </button>
          </form>
        </div>

        <div data-aos="fade-up" data-aos-delay={10} className="space-y-4 mb-6">
          {currentComments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className={generateAvatarClass(comment.name)}>
                  {comment.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex  sm:items-center gap-2 sm:gap-3 mb-2">
                    <h4 className="font-semibold text-gray-800 text-base sm:text-lg break-words">
                      {comment.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      {comment.attendance === "hadir" ? (
                        <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                          <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="hidden sm:inline ml-1">Hadir</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 bg-red-100 text-red-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                          <X className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="hidden sm:inline ml-1">
                            Tidak Hadir
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-3 text-sm sm:text-base break-words">
                    {comment.message}
                  </p>
                  <div className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    {formatDate(comment.date)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 sm:gap-4">
            <button
              data-aos="fade-left"
              data-aos-delay={10}
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm sm:text-base"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Sebelumnya</span>
            </button>
            <span
              data-aos="fade-up"
              data-aos-delay={10}
              className="px-3 sm:px-4 py-2 bg-neutral text-white rounded-lg font-semibold text-sm sm:text-base"
            >
              {currentPage} / {totalPages}
            </span>
            <button
              data-aos="fade-right"
              data-aos-delay={10}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm sm:text-base"
            >
              <span className="hidden sm:inline">Selanjutnya</span>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        )}

        {showAttendanceModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-5 sm:p-6 w-full max-w-md mx-4 transform transition-all">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 text-center">
                Konfirmasi Kehadiran
              </h3>
              <p className="text-gray-600 mb-6 text-center text-sm sm:text-base">
                Apakah Anda akan hadir dalam acara ini?
              </p>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <button
                  onClick={() => handleAttendanceSelection("hadir")}
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2.5 sm:py-3 px-4 rounded-lg transition-all disabled:opacity-50 text-sm sm:text-base"
                >
                  <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Ya, Hadir</span>
                </button>
                <button
                  onClick={() => handleAttendanceSelection("tidak-hadir")}
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2.5 sm:py-3 px-4 rounded-lg transition-all disabled:opacity-50 text-sm sm:text-base"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Tidak Hadir</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
