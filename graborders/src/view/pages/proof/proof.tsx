import React, { useState, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { i18n } from "../../../i18n";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import InputFormItem from "src/shared/form/InputFormItem";
import ImagesFormItem from "src/shared/form/ImagesFormItems";
import * as yup from "yup";
import actions from "src/modules/kyc/form/kycFormActions";
import { yupResolver } from "@hookform/resolvers/yup";
import authSelectors from "src/modules/auth/authSelectors";
import transactionEnumerators from "src/modules/transaction/transactionEnumerators";
import Storage from "src/security/storage";

// Dynamic schema function
const createSchema = (documentType) =>
  yup.object().shape({
    user: yupFormSchemas.relationToOne(i18n("entities.vip.fields.title"), {}),
    Documenttype: yupFormSchemas.string(i18n("pages.proof.fields.documentType")),
    realname: yupFormSchemas.string(i18n("pages.proof.fields.fullName"), { required: true }),
    idnumer: yupFormSchemas.string(i18n("pages.proof.fields.documentNumber"), { required: true }),
    address: yupFormSchemas.string(i18n("pages.proof.fields.address"), { required: true }),
    front: yupFormSchemas.images(i18n("pages.proof.fields.frontSide"), { required: true }),
    back:
      documentType === "passport"
        ? yupFormSchemas.images(i18n("pages.proof.fields.backSide"))
        : yupFormSchemas.images(i18n("pages.proof.fields.backSide"), { required: true }),

    status: yupFormSchemas.enumerator(
      i18n("entities.transaction.fields.status"),
      { options: transactionEnumerators.status }
    ),
  });

function Proof() {
  const [document, setDocument] = useState("passport");
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const dispatch = useDispatch();

  // Use useMemo to recompute schema only when document changes
  const schema = useMemo(() => createSchema(document), [document]);

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: {
      user: currentUser || [],
      Documenttype: document,
      realname: "",
      idnumer: "",
      address: "",
      front: [],
      back: [],
      status: "pending",
    },
  });

  const onSubmit = (values) => {
    const data = { ...values, user: currentUser, Documenttype: document };
    if (document === "passport") data.back = [];
    dispatch(actions.doCreate(data));
  };

  const handleDocumentChange = (type) => {
    setDocument(type);
    if (type === "passport") form.setValue("back", []);
  };

  const documentTypeOptions = [
    { value: "passport", label: i18n("pages.proof.documentTypes.passport"), icon: "fas fa-passport" },
    { value: "idCard", label: i18n("pages.proof.documentTypes.idCard"), icon: "fas fa-id-card" },
    { value: "driversLicense", label: i18n("pages.proof.documentTypes.driversLicense"), icon: "fas fa-id-card-alt" },
  ];

  return (
    <div className="proof-container">
      {/* Header Section - Matching Profile Page */}
      <div className="header">
        <div className="nav-bar">
          <Link to="/profile" className="back-arrow">
            <i className="fas fa-arrow-left" />
          </Link>
          <div className="page-title">{i18n("pages.proof.title")}</div>
        </div>
      </div>

      {/* Content Card - Matching Profile Page */}
      <div className="content-card">
        <div className="instructions">
          <i className="fas fa-info-circle"></i>
          {i18n("pages.proof.instructions")}
        </div>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Document Info */}
            <div className="form-section">
              <div className="section-title">
                {i18n("pages.proof.sections.documentInfo")}
              </div>

              <div className="document-type-section">
                <div className="input-label">
                  {i18n("pages.proof.fields.documentType")} <span className="required">*</span>
                </div>
                <div className="document-type-options">
                  {documentTypeOptions.map((item) => (
                    <div
                      key={item.value}
                      className={`document-option ${item.value === document ? "selected" : ""}`}
                      onClick={() => handleDocumentChange(item.value)}
                    >
                      <i className={`${item.icon} document-icon`} />
                      <span className="document-text">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="input-group">
                <InputFormItem
                  className="form-input"
                  name="realname"
                  label={i18n("pages.proof.fields.fullName")}
                  placeholder={i18n("pages.proof.placeholders.fullName")}
                />
              </div>

              <div className="input-group">
                <InputFormItem
                  className="form-input"
                  name="idnumer"
                  label={i18n("pages.proof.fields.documentNumber")}
                  placeholder={i18n("pages.proof.placeholders.documentNumber")}
                />
              </div>

              <div className="input-group">
                <InputFormItem
                  className="form-input"
                  name="address"
                  label={i18n("pages.proof.fields.address")}
                  placeholder={i18n("pages.proof.placeholders.address")}
                />
              </div>
            </div>

            {/* Upload Section */}
            <div className="form-section">
              <div className="section-title">
                {i18n("pages.proof.sections.documentUpload")}
              </div>

              <div className="upload-section">
                <ImagesFormItem
                  name="front"
                  label={i18n("pages.proof.fields.frontSide")}
                  storage={Storage.values.categoryPhoto}
                  text={i18n("pages.proof.uploadTexts.frontSide")}
                  max={2}
                />
              </div>

              {document !== "passport" && (
                <div className="upload-section">
                  <ImagesFormItem
                    name="back"
                    label={i18n("pages.proof.fields.backSide")}
                    storage={Storage.values.categoryPhoto}
                    text={i18n("pages.proof.uploadTexts.backSide")}
                    max={2}
                  />
                </div>
              )}

            </div>

            {/* Security Note */}
            <div className="security-note">
              <div className="security-header">
                <i className="fas fa-shield-alt" /> {i18n("pages.proof.security.title")}
              </div>
              <div className="security-text">
                {i18n("pages.proof.security.text")}
              </div>
            </div>

            <button type="submit" className="submit-button">
              {i18n("pages.proof.buttons.validateDocuments")}
            </button>
          </form>
        </FormProvider>
      </div>

      <style>{`
        /* Proof Container – matches login/profile containers */
        .proof-container {
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

        /* Header / Navigation (matches profile) */
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

        /* Content Card – matches profile card */
        .content-card {
          flex: 1;
          background-color: #1c1c1c;
          border-top-left-radius: 24px;
          border-top-right-radius: 24px;
          padding: 24px 20px;
          margin-top: 20px;
          border-top: 2px solid #39FF14;
        }

        /* Instructions banner */
        .instructions {
          background-color: #2a2a2a;
          border-left: 4px solid #39FF14;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 24px;
          font-size: 14px;
          color: #ffffff;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .instructions i {
          color: #39FF14;
          font-size: 18px;
        }

        /* Form sections */
        .form-section {
          margin-bottom: 32px;
        }
        .section-title {
          font-size: 16px;
          font-weight: 600;
          color: #39FF14;
          margin-bottom: 20px;
          padding-bottom: 8px;
          border-bottom: 1px solid #2a2a2a;
        }

        /* Document type selector */
        .document-type-section {
          margin-bottom: 20px;
        }
        .input-label {
          font-size: 14px;
          color: #ffffff;
          margin-bottom: 8px;
        }
        .required {
          color: #39FF14;
        }
        .document-type-options {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .document-option {
          flex: 1;
          min-width: 100px;
          background-color: #2a2a2a;
          border: 1px solid #2a2a2a;
          border-radius: 8px;
          padding: 12px 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .document-option:hover {
          border-color: #39FF14;
          background-color: #333333;
        }
        .document-option.selected {
          border-color: #39FF14;
          background-color: rgba(57, 255, 20, 0.1);
        }
        .document-icon {
          font-size: 24px;
          color: #39FF14;
        }
        .document-text {
          font-size: 12px;
          text-align: center;
          color: #ffffff;
        }

        /* Input fields – matches login page input styling */
        .form-input {
          background-color: #1c1c1c;
          border: 1px solid #2a2a2a;
          border-radius: 6px;
          height: 48px;
          width: 100%;
          padding: 0 16px;
          color: #ffffff;
          font-size: 16px;
          outline: none;
          box-sizing: border-box;
        }
        .form-input:focus {
          border-color: #39FF14;
        }
        .form-input::placeholder {
          color: #777777;
        }

        /* Input groups (for label + input) – assuming label is rendered by InputFormItem */
        .input-group {
          margin-bottom: 16px;
        }
        /* If InputFormItem renders its own label, we can style it generically */
        .input-group label {
          display: block;
          font-size: 14px;
          color: #ffffff;
          margin-bottom: 6px;
        }

        /* Upload sections – base styles for ImagesFormItem containers */
        .upload-section {
          margin-bottom: 24px;
        }
        /* You may need to add specific overrides for the upload component's internal elements */
        .upload-section .images-form-item {
          /* Add styles if needed */
        }
        .upload-section .image-upload-area {
          background-color: #2a2a2a;
          border: 2px dashed #39FF14;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .upload-section .image-upload-area:hover {
          background-color: #333333;
        }
        .upload-section .image-upload-area i {
          color: #39FF14;
          font-size: 24px;
          margin-bottom: 8px;
        }
        .upload-section .image-upload-area p {
          color: #ffffff;
          font-size: 14px;
        }
        .upload-section .image-preview {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 10px;
        }
        .upload-section .image-preview img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 6px;
          border: 2px solid #39FF14;
        }

        /* Security note */
        .security-note {
          background-color: #2a2a2a;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 24px;
        }
        .security-header {
          font-size: 14px;
          font-weight: bold;
          color: #39FF14;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .security-text {
          font-size: 13px;
          color: #bbbbbb;
          line-height: 1.5;
        }

        /* Submit button – matches login button */
        .submit-button {
          background-color: #39FF14;
          color: #000000;
          font-weight: bold;
          height: 50px;
          width: 100%;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .submit-button:hover {
          background-color: #2ecc10;
        }
        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

export default Proof;