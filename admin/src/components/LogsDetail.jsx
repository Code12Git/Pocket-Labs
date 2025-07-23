'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { logsOverTime } from '../redux /actions/expenseActions';

const LogsDetail = () => {
  const dispatch = useDispatch();
  const { logs } = useSelector(state => state.expense)
  useEffect(() => {
    dispatch(logsOverTime());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Activity Logs</h2>

      {logs?.length === 0 ? (
        <div className="text-gray-500">No logs found.</div>
      ) : (
        <div className="space-y-4">
          {logs?.map((log) => (
            <motion.div
              key={log._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white shadow-md rounded-2xl p-4 border border-gray-200"
            >
              <div className="text-sm text-gray-500">
                {new Date(log.timestamp).toLocaleString()}
              </div>
              <div className="text-lg font-medium text-gray-800 mt-1">
                {log.actionType.replace(/_/g, ' ')}
              </div>
              <div className="text-gray-700 mt-2">{log.description}</div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LogsDetail;
