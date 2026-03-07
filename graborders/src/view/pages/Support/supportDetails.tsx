import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { i18n } from "../../../i18n";

function HelpCenterDetail() {
  const { id } = useParams();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // Updated FAQ data with new entries
  const faqData = [
    {
      id: "1",
      question: i18n("pages.helpCenter.faq.aboutAccounts"),
      answer: i18n("pages.helpCenterDetail.answers.aboutAccounts")
    },
    {
      id: "2",
      question: i18n("pages.helpCenter.faq.transactionVolume"),
      answer: i18n("pages.helpCenterDetail.answers.transactionVolume")
    },
    {
      id: "3",
      question: i18n("pages.helpCenter.faq.transferFunds"),
      answer: i18n("pages.helpCenterDetail.answers.transferFunds")
    },
    {
      id: "4",
      question: i18n("pages.helpCenter.faq.whatAreFutures"),
      answer: i18n("pages.helpCenterDetail.answers.whatAreFutures")
    },
    {
      id: "5",
      question: i18n("pages.helpCenter.faq.convertedAmountChanges"),
      answer: i18n("pages.helpCenterDetail.answers.convertedAmountChanges")
    },
    {
      id: "6",
      question: i18n("pages.helpCenter.faq.realNameAuthentication"),
      answer: i18n("pages.helpCenterDetail.answers.realNameAuthentication")
    },
    {
      id: "7",
      question: i18n("pages.helpCenter.faq.frozenAssets"),
      answer: i18n("pages.helpCenterDetail.answers.frozenAssets")
    },
    {
      id: "8",
      question: i18n("pages.helpCenter.faq.futuresTradingRules"),
      answer: i18n("pages.helpCenterDetail.answers.futuresTradingRules")
    },
    {
      id: "9",
      question: i18n("pages.helpCenterDetail.questions.aiQuantification"),
      answer: i18n("pages.helpCenterDetail.answers.aiQuantification")
    },
    {
      id: "10",
      question: i18n("pages.helpCenterDetail.questions.exploreNFTs"),
      answer: i18n("pages.helpCenterDetail.answers.exploreNFTs")
    },
    {
      id: "11",
      question: i18n("pages.helpCenterDetail.questions.bitcoinEnergy"),
      answer: i18n("pages.helpCenterDetail.answers.bitcoinEnergy")
    },
    {
      id: "12",
      question: i18n("pages.helpCenterDetail.questions.bitcoinRecordPrice"),
      answer: i18n("pages.helpCenterDetail.answers.bitcoinRecordPrice")
    },
    {
      id: "13",
      question: i18n("pages.helpCenterDetail.questions.trumpStatueBitcoin"),
      answer: i18n("pages.helpCenterDetail.answers.trumpStatueBitcoin")
    }
  ];

  useEffect(() => {
    // Find the FAQ item by id
    const faqItem = faqData.find(item => item.id === id);
    
    if (faqItem) {
      setQuestion(faqItem.question);
      setAnswer(faqItem.answer);
    } else {
      // If no FAQ found, redirect back to help center
      // In a real app, you would use: navigate('/support');
      console.log(i18n("pages.helpCenterDetail.faqNotFound"));
    }
  }, [id]);

  return (
    <div className="helpcenterdetail-container">
      {/* Header Section - Matching Profile Page */}
      <div className="header">
        <div className="nav-bar">
          <Link to="/support" className="back-arrow">
            <i className="fas fa-arrow-left" />
          </Link>
          <div className="page-title">{i18n("pages.helpCenter.title")}</div>
        </div>
      </div>

      {/* Content Card - Matching Profile Page */}
      <div className="content-card">
        <div className="helpcenterdetail-content">
          {question && (
            <>
              <div className="question-title">{question}</div>
              <div className="divider-line"></div>
              <div className="answer-content">{answer}</div>
            </>
          )}
        </div>
      </div>

      <style>{`
        /* HelpCenterDetail Container – matches login/profile containers */
        .helpcenterdetail-container {
          max-width: 430px;
          margin: 0 auto;
          min-height: 100vh;
          background-color: #000000;
          border-top: 2px solid #39FF14;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          color: #ffffff;
        }

        /* Header / Navigation */
        .header {
          padding: 16px 20px;
          border-bottom: 1px solid #2a2a2a;
        }
        .nav-bar {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .back-arrow {
          color: #ffffff;
          font-size: 20px;
          text-decoration: none;
        }
        .back-arrow:hover {
          color: #39FF14;
        }
        .page-title {
          font-size: 18px;
          font-weight: 500;
          color: #ffffff;
        }

        /* Content Card */
        .content-card {
          flex: 1;
          background-color: #1c1c1c;
          border-top-left-radius: 24px;
          border-top-right-radius: 24px;
          padding: 24px 20px;
          margin-top: 20px;
          border-top: 2px solid #39FF14;
        }

        /* Detail content */
        .helpcenterdetail-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .question-title {
          font-size: 20px;
          font-weight: 600;
          color: #39FF14;
          line-height: 1.4;
        }

        .divider-line {
          height: 1px;
          background-color: #2a2a2a;
          width: 100%;
        }

        .answer-content {
          font-size: 16px;
          color: #dddddd;
          line-height: 1.6;
        }

        /* Optional: style for when question not found (you can add a message) */
        .not-found-message {
          text-align: center;
          color: #777777;
          padding: 40px 20px;
        }
      `}</style>
    </div>
  );
}

export default HelpCenterDetail;