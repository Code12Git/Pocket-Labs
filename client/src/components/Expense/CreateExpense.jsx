import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import createExpenseValidation from '../../validations/expense/ExpenseValidation';
import { useDispatch } from 'react-redux';
import { createExpense } from '../../redux/actions/expenseActions';

const CreateExpense = () => {
  const dispatch = useDispatch()
  const { register, handleSubmit,reset, formState: { errors, isSubmitting }} = useForm({
    resolver: zodResolver(createExpenseValidation),
    defaultValues: {
      amount: 0,
      category: '',
      date: '',
      notes: ''
    },
  });

  const onSubmit = (values) => {
    console.log(values);
    dispatch(createExpense(values))
    reset()
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Create Expense</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            {...register('amount')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Enter amount"
          />
          {errors?.amount && <p className="text-red-500 text-sm mt-1">{errors?.amount.message}</p>}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Category</label>
          <select
            {...register('category')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
          >
            <option value="">Select category</option>
            <option value="travel">Travel</option>
            <option value="food">Food</option>
            <option value="accommodation">Accommodation</option>
            <option value="office supplies">Office Supplies</option>
            <option value="other">Other</option>
          </select>
          {errors?.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            {...register('date')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Notes</label>
          <textarea
            {...register('notes')}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Optional notes"
          />
          {errors.notes && <p className="text-red-500 text-sm mt-1">{errors.notes.message}</p>}
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full cursor-pointer py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition duration-200"
        >
          Submit
        </motion.button>
      </form>
    </motion.div>
  );
};

export default CreateExpense;
