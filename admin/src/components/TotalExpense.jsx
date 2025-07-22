'use client';
import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { totalExpense } from "../redux /actions/expenseActions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const TotalExpense = () => {
  const { totalExpenses } = useSelector((state) => state.expense);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(totalExpense());
  }, [dispatch]);

  console.log(totalExpenses)

  // Standardize and define all possible labels
  const labels = ["Travel", "Food", "Accommodation", "Officesupplies", "Other"];

  // Normalize category case and map to total amounts
  const categoryMap = {};

  labels.forEach((label) => {
    categoryMap[label.toLowerCase()] = 0;
  });

  totalExpenses?.forEach((item) => {
    const key = item.category?.toLowerCase();
    if (Object.prototype.hasOwnProperty.call(categoryMap, key)) categoryMap[key] += item.totalAmount;
    
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Total Expense Status (2025)",
        data: labels.map((label) => categoryMap[label.toLowerCase()] || 0),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
        ],
        borderWidth: 1,
        barPercentage: 1,
        borderRadius: {
          topLeft: 5,
          topRight: 5,
        },
      },
    ],
  };

  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: "Expense Amount",
        },
        beginAtZero: true,
        max: 10000,
      },
      x: {
        title: {
          display: true,
          text: "Categories",
        },
      },
    },
  };

  return (
    <div className="mx-auto p-4 w-full max-w-7xl">
      <Bar data={data} options={options} />
    </div>
  );
};

export default TotalExpense;
