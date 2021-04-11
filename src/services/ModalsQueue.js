import {logInfo} from '../utilities';

class ModalsQueueClass {
  modalsQueue = [];
  currentlyOpenedModal = {modalId: null};

  clearModalQueue = () => {
    this.modalsQueue = [];
    this.currentlyOpenedModal = {modalId: null};
  };

  showModal = ({modalId, showModalFunction}) => {
    logInfo(
      JSON.stringify({
        modalsQueue: this.modalsQueue,
        currentlyOpenedModal: this.currentlyOpenedModal,
      }),
    );
    if (!modalId || !showModalFunction) {
      return;
    }

    if (this.currentlyOpenedModal.modalId) {
      return this.modalsQueue.push({modalId, showModalFunction});
    }
    this.currentlyOpenedModal.modalId = modalId;
    return showModalFunction();
  };

  hideModal = ({modalId, hideModalFunction}) => {
    if (!modalId || !hideModalFunction) {
      return;
    }

    hideModalFunction();

    if (modalId === this.currentlyOpenedModal.modalId) {
      this.currentlyOpenedModal.modalId = null;
    }

    const modalQueueAfterHidingCurrentModal = this.modalsQueue.filter(
      (modal) => modal.modalId !== modalId,
    );

    this.modalsQueue = modalQueueAfterHidingCurrentModal;

    if (modalQueueAfterHidingCurrentModal.length > 0) {
      setTimeout(() => {
        modalQueueAfterHidingCurrentModal[0]?.showModalFunction();
        this.currentlyOpenedModal.modalId =
          modalQueueAfterHidingCurrentModal[0]?.modalId;
      }, 2000);

      return;
    }
  };
}

const ModalsQueue = new ModalsQueueClass();

export default ModalsQueue;
