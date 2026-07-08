import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import userSelectors from 'src/modules/user/userSelectors';
import selectors from 'src/modules/user/list/userListSelectors';
import actions from 'src/modules/user/list/userListActions';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import Pagination from 'src/view/shared/table/Pagination';
import Spinner from 'src/view/shared/Spinner';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Roles from 'src/security/roles';
import authSelectors from 'src/modules/auth/authSelectors';
import UserStatusView from 'src/view/user/view/UserStatusView';
import recordListActions from 'src/modules/record/list/recordListActions';
import selectorTaskdone from 'src/modules/record/list/recordListSelectors';
import UserService from 'src/modules/user/userService';

function UserTable() {
  const dispatch = useDispatch();
  const [recordIdToDestroy, setRecordIdToDestroy] =
    useState(null);
  const [totalTask, setTotalTasks] = useState('');
  const tasksdone = useSelector(
    selectorTaskdone.selectCountRecord,
  );
  const LoadingTasksDone = useSelector(
    selectorTaskdone.selectLoading,
  );
    const [recordIdToDestroyPermanently, setRecordIdToDestroyPermanently] =
      useState(null);
  const loading = useSelector(selectors.selectLoading);
  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const selectedKeys = useSelector(
    selectors.selectSelectedKeys,
  );
  const [showTask, setShowTask] = useState(false);
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);
  const [dailytask, setDailyTask] = useState(0);
  const isAllSelected = useSelector(
    selectors.selectIsAllSelected,
  );
  const hasPermissionToEdit = useSelector(
    userSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    userSelectors.selectPermissionToDestroy,
  );
  // Freeze / Ban / Delete Permanently are restricted to the admin role only.
  const currentUserRoles = useSelector(authSelectors.selectRoles);
  const isAdmin = (currentUserRoles || []).includes(Roles.values.admin);

  const doDestroy = (id) => {
    setRecordIdToDestroy(null);
    dispatch(actions.doDestroy(id));
  };

  const doChangeSort = (field) => {
    const order =
      sorter.field === field && sorter.order === 'ascend'
        ? 'descend'
        : 'ascend';
    dispatch(actions.doChangeSort({ field, order }));
  };

  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };

  const paginationClient = (pagination) => {
    dispatch(actions.doChangePaginationClient(pagination));
  };

  const doToggleAllSelected = () => {
    dispatch(actions.doToggleAllSelected());
  };

  const doToggleOneSelected = (id) => {
    dispatch(actions.doToggleOneSelected(id));
  };

  const showThecurrentRecord = async (
    dailyTask,
    totaltask?,
  ) => {
    setShowTask(true);
    setDailyTask(dailyTask);
    setTotalTasks(totaltask);
  };

  useEffect(() => { }, [dispatch, tasksdone]);
  const oneClick = async (id) => {
    await UserService.doOneClickLogin(id);
  };

   const doDestroyPermanently = (id) => {
    setRecordIdToDestroyPermanently(null);
    dispatch(actions.doDestroyPermanentlyClient(id));
  };

  return (
    <>
      <div className="spot-list-container">
        <div className="table-responsive">
          <table className="spot-list-table">
            <thead className="table-header">
              <tr>
                <th className="checkbox-column">
                  {hasRows && (
                    <div className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={Boolean(isAllSelected)}
                        onChange={doToggleAllSelected}
                      />
                    </div>
                  )}
                </th>
                <th
                  className="sortable-header"
                  onClick={() => doChangeSort('email')}
                >
                  {i18n('user.fields.email')}
                  {sorter.field === 'email' && (
                    <span className="sort-icon">
                      {sorter.order === 'ascend'
                        ? '↑'
                        : '↓'}
                    </span>
                  )}
                </th>
                <th
                  className="sortable-header"
                  onClick={() => doChangeSort('fullName')}
                >
                  {i18n('user.fields.fullName')}
                  {sorter.field === 'fullName' && (
                    <span className="sort-icon">
                      {sorter.order === 'ascend'
                        ? '↑'
                        : '↓'}
                    </span>
                  )}
                </th>

                <th>Location</th>

                <th className="sortable-header">
                  {i18n('user.fields.status')}
                </th>
                <th className="actions-header">Actions</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {loading && (
                <tr>
                  <td colSpan={8} className="loading-cell">
                    <div className="loading-container">
                      <Spinner />
                      <span className="loading-text">
                        Loading data...
                      </span>
                    </div>
                  </td>
                </tr>
              )}
              {!loading && !hasRows && (
                <tr>
                  <td colSpan={8} className="no-data-cell">
                    <div className="no-data-content">
                      <i className="fas fa-database no-data-icon"></i>
                      <p>{i18n('table.noData')}</p>
                    </div>
                  </td>
                </tr>
              )}
              {!loading &&
                rows.map((row) => (
                  <tr key={row.id} className="table-row">
                    <td className="checkbox-column">
                      <div className="checkbox-wrapper">
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          checked={selectedKeys.includes(
                            row.id,
                          )}
                          onChange={() =>
                            doToggleOneSelected(row.id)
                          }
                        />
                      </div>
                    </td>
                    <td className="table-cell">
                      {row.email}
                    </td>
                    <td className="table-cell">
                      {row.fullName}
                    </td>

                    <td>
                      {' '}
                      {row.ipAddress} <br /> {row.country}{' '}
                    </td>

                    <td className="table-cell">
                      <UserStatusView value={row.status} />
                    </td>
                    <td className="actions-cell">
                      <div className="actions-container">

                        {row.approved === false && (
                          <button
                            className="btn-action approve"
                            style={{
                              backgroundColor: '#28a745',
                              color: 'white',
                              marginRight: '5px',
                            }}
                            onClick={() =>
                              dispatch(actions.doApproveClient(row.id))
                            }
                          >
                            <i className="fas fa-check"></i>
                            <span>{i18n('common.allowAccess')}</span>
                          </button>
                        )}

                        <Link
                          className="btn btn-link"
                          to={`/user/${row.id}`}
                        >
                          <i className="fas fa-eye"></i>

                        </Link>


                        <Link
                          className="btn btn-link"
                          to={`/password-reset/${row.id}`}
                        >
                          <i className="fas fa-key"></i>
                        </Link>

                        {hasPermissionToEdit && (
                          <Link
                            className="btn btn-link"
                            to={`/user/${row.id}/edit`}
                          >
                            <i className="fas fa-edit"></i>

                          </Link>
                        )}

                        {/* Freeze / Unfreeze: a frozen client can still log in
                            but can't trade or withdraw. Admin role only. */}
                        {isAdmin && (
                          <button
                            className="btn-action"
                            style={{
                              backgroundColor: row.frozen ? '#17a2b8' : '#ffc107',
                              color: row.frozen ? '#fff' : '#212529',
                              marginRight: '5px',
                            }}
                            onClick={() =>
                              dispatch(
                                actions.doFreezeClient(row.id, !row.frozen),
                              )
                            }
                          >
                            <i
                              className={`fas ${
                                row.frozen ? 'fa-unlock' : 'fa-snowflake'
                              }`}
                            ></i>
                            <span>
                              {row.frozen
                                ? i18n('common.unfreeze')
                                : i18n('common.freeze')}
                            </span>
                          </button>
                        )}

                        {isAdmin && (
                          <button
                            className="btn-action delete"
                            onClick={() =>
                              setRecordIdToDestroy(row.id)
                            }
                          >
                            <i className="fas fa-ban"></i>
                            <span>
                              {i18n('common.ban')}
                            </span>
                          </button>
                        )}

                        {isAdmin && hasPermissionToDestroy && (
                          <button
                            className="btn-action delete"
                            style={{ backgroundColor: '#dc3545',  color:'white',  marginLeft: '5px' }}
                            onClick={() =>
                              setRecordIdToDestroyPermanently(row.id)
                            }
                          >
                            <i className="fas fa-trash-alt"></i>
                            <span>
                              {i18n('common.deletePermanently')}
                            </span>
                          </button>
                        )}

                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="pagination-container">
          <Pagination
            onChange={paginationClient}
            disabled={loading}
            pagination={pagination}
          />
        </div>
      </div>

      {recordIdToDestroy && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doDestroy(recordIdToDestroy)}
          onClose={() => setRecordIdToDestroy(null)}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}

         {recordIdToDestroyPermanently && (
        <ConfirmModal
          title={i18n('common.areYouSureDeletePermanently')}
          onConfirm={() => doDestroyPermanently(recordIdToDestroyPermanently)}
          onClose={() => setRecordIdToDestroyPermanently(null)}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
          okStyle="danger"
        />
      )}
      {!LoadingTasksDone && showTask && (
        <div className="modal__socore">
          <div
            className="score__close"
            onClick={() => setShowTask(false)}
          >
            <i className="fa fa-close font" />
          </div>
          <div className="modal__contentscore">
            <p className="text__score">
              {dailytask} / {totalTask}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default UserTable;
