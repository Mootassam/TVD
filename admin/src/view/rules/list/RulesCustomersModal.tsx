import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { i18n } from 'src/i18n';
import UserAutocompleteFormItem from 'src/view/user/autocomplete/UserAutocompleteFormItem';

// Inline modal for managing per-customer visibility of a rule.
// `record.disabledFor` (blacklist) and `record.enabledFor` (whitelist) are each
// expected to be an array of { id, fullName, email }.
function RulesCustomersModal(props) {
  const modalRef = useRef<any>();

  const form = useForm({
    mode: 'all',
    defaultValues: {
      disabledFor: props.record?.disabledFor || [],
      enabledFor: props.record?.enabledFor || [],
    },
  });

  useEffect(() => {
    (window as any).$(modalRef.current).modal('show');
    (window as any)
      .$(modalRef.current)
      .on('hidden.bs.modal', props.onClose);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const close = () => {
    (window as any).$(modalRef.current).modal('hide');
  };

  const onSubmit = (values) => {
    const disabledFor = (values.disabledFor || []).map((user) => user.id);
    const enabledFor = (values.enabledFor || []).map((user) => user.id);
    props.onSave(props.record.id, { disabledFor, enabledFor });
    close();
  };

  return ReactDOM.createPortal(
    <div ref={modalRef} className="modal" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {i18n('entities.category.targetCustomers')}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
            >
              <span>&times;</span>
            </button>
          </div>

          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="modal-body">
                <UserAutocompleteFormItem
                  name="enabledFor"
                  label={i18n('entities.category.fields.enabledFor')}
                  mode="multiple"
                  showCreate={false}
                />
                <small className="form-text text-muted">
                  {i18n('entities.category.enabledForHint')}
                </small>

                <hr />

                <UserAutocompleteFormItem
                  name="disabledFor"
                  label={i18n('entities.category.fields.disabledFor')}
                  mode="multiple"
                  showCreate={false}
                />
                <small className="form-text text-muted">
                  {i18n('entities.category.disabledForHint')}
                </small>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light btn-sm"
                  data-dismiss="modal"
                >
                  {i18n('common.cancel')}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                >
                  {i18n('common.save')}
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>,
    (document as any).getElementById('modal-root'),
  );
}

export default RulesCustomersModal;
