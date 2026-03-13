import styled from "styled-components";

const ImagesUploaderWrapper = styled.div`
  .upload-area {
    background-color: #2a2a2a;
    border: 2px dashed #39ff14;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin-top: 12px; /* space above the upload area */

    &:hover {
      background-color: #333333;
    }

    .upload-icon i {
      color: #39ff14;
      font-size: 24px;
    }

    .upload-text {
      color: #ffffff;
      font-size: 14px;
      font-weight: 500;
    }

    .upload-subtext {
      color: #aaaaaa;
      font-size: 12px;
    }
  }

  .upload-card {
    margin-bottom: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .uploaded-box {
    position: relative;
    width: 100%;          /* same as desired preview size */
    height: 260px;
    background-color: #2a2a2a;
    border: 2px solid #39ff14;  /* solid border for uploaded state */
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    .uploaded-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .img-buttons {
      position: absolute;
      top: 4px;
      right: 4px;
      display: flex;
      gap: 4px;
      background: rgba(0, 0, 0, 0.6);
      border-radius: 4px;
      padding: 2px;

      button {
        background: transparent;
        border: none;
        color: #ffffff;
        font-size: 14px;
        padding: 4px 6px;
        cursor: pointer;
        transition: color 0.2s;
        line-height: 1;

        &:hover {
          color: #39ff14;
        }

        i {
          font-size: 14px;
        }
      }
    }
  }
`;

export default ImagesUploaderWrapper;