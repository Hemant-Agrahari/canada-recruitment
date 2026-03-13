import Link from "next/link";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface ConfirmationPopupProps {
  showModal: boolean;
  onConfirm: (e: React.FormEvent) => void;
  onCancel: () => void;
}


const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({ showModal, onConfirm, onCancel }) => {

  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal
        className="confirmation-popup"
        show={showModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={onCancel}

      >
        <div className="confirmation-card">
          <div className="confirmation-header">
            <h5>Thanks for the details, please confirm below details</h5>
            <button className="close-button" onClick={onCancel} >
              &times;
            </button>
          </div>
          <div className="confirmation-body">
            <button className="btn btn-outline" onClick={onConfirm} >
              <svg
                width="25"
                height="25"
                viewBox="0 0 42 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M41.5667 38.5058L34.3691 31.1197C34.0825 30.8255 33.615 30.8255 33.3283 31.1197L33.174 31.2781L30.6072 28.644C32.9579 25.6253 34.3691 21.801 34.3691 17.6372C34.3691 7.89759 26.6732 0 17.1824 0C7.69149 0 0 7.90212 0 17.6417C0 27.3813 7.6959 35.2789 17.1868 35.2789C21.2442 35.2789 24.9709 33.8307 27.9125 31.4184L30.4749 34.0479L30.3205 34.2063C30.0339 34.5005 30.0339 34.9802 30.3205 35.2744L37.5181 42.6606C37.9591 43.1131 38.6692 43.1131 39.1102 42.6606L41.5667 40.1397C42.0077 39.6871 42.0077 38.9584 41.5667 38.5058ZM17.1868 31.355C9.80401 31.355 3.82369 25.2135 3.82369 17.6417C3.82369 10.07 9.80842 3.92843 17.1868 3.92843C24.5651 3.92843 30.5499 10.07 30.5499 17.6417C30.5499 25.2135 24.5651 31.355 17.1868 31.355ZM17.1868 19.3253C20.0226 19.3253 22.3203 16.9674 22.3203 14.0573C22.3203 11.1471 20.0226 8.78918 17.1868 8.78918C14.351 8.78918 12.0532 11.1471 12.0532 14.0573C12.0532 16.9674 14.351 19.3253 17.1868 19.3253ZM21.4515 20.8867H12.9176C12.0135 20.8867 11.277 21.6471 11.277 22.5704V28.5128C13.0279 29.5175 15.039 30.0923 17.1824 30.0923C19.3258 30.0923 21.3412 29.5175 23.0877 28.5128V22.5749C23.0921 21.6471 22.3512 20.8867 21.4515 20.8867Z"
                  fill="#898989"
                />
              </svg>
              Yes, I'm Employer
            </button>
            <button className="btn btn-outline mb-0" onClick={onCancel}>
              <svg
                width="25"
                height="25"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.2094 21.9682C19.52 23.6576 19.52 26.4263 21.2094 28.1626C22.8988 29.852 25.6675 29.852 27.4038 28.1626C29.0932 26.4732 29.0932 23.7045 27.4038 21.9682C25.6675 20.2788 22.8988 20.2788 21.2094 21.9682Z"
                  fill="#898989"
                />
                <path
                  d="M39.6034 12.4436H32.7989V9.11173C32.7989 7.93855 31.8604 7 30.6872 7H17.5475C16.3743 7 15.4358 7.93855 15.4358 9.11173V12.4436H8.63129C5.53408 12.4436 3 14.9777 3 18.0749V34.9687C3 38.0659 5.53408 40.6 8.63129 40.6H39.6034C42.7006 40.6 45.2347 38.0659 45.2347 34.9687V18.0749C45.2347 14.9777 42.7006 12.4436 39.6034 12.4436ZM16.8905 9.58101C16.8905 9.01788 17.3598 8.50168 17.9698 8.50168H30.3587C30.9218 8.50168 31.438 8.97095 31.438 9.58101V12.4436H16.8905V9.58101ZM32.4235 34.5933L27.7308 29.9006C25.4313 31.543 22.1933 31.3084 20.1285 29.2436C17.8291 26.9441 17.8291 23.1899 20.1285 20.8905C22.428 18.5911 26.1821 18.5911 28.4816 20.8905C30.5464 22.9553 30.7341 26.1464 29.1386 28.4927L33.8313 33.1855L32.4235 34.5933Z"
                  fill="#898989"
                />
              </svg>
              <Link href="https://www.alliancerecruitmentagency.com/job-seekers/"> No, I'm Job Seeker </Link>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmationPopup;
