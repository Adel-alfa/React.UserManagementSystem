import { useEffect, useState } from "react";
import type { ILogDto } from "../../types/logDto";
import axiosInstance from "../../utils/axiosInstance";
import { LOGS_URL } from "../../utils/globalConfig";
import { toast } from "react-hot-toast";
import Spinner from "../../components/general/Spinner";
import moment from "moment";

const SystemLogsPage = () => {
  const [logs, setLogs] = useState<ILogDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  //--------------paging------------
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const totalPages = Math.ceil(logs.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const pagedLogs = logs.slice(startIndex, startIndex + pageSize);
  //--------------------------
  const getLogs = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<ILogDto[]>(LOGS_URL);
      const { data } = response;
      setLogs(data);
      setLoading(false);
    } catch (error) {
      toast.error("An Error happened. Please Contact admins");
      setLoading(false);
      console.error("Error fetching logs:", error);
    }
  };

  useEffect(() => {
    getLogs();
  }, []);

  if (loading) {
    return (
      <div className="w-full">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="pageTemplate2">
      <h1 className="text-2xl font-bold">System Logs</h1>
      <div className="pageTemplate3 items-stretch">
        {/* Page size selector */}
        <div className="flex items-center gap-2 mb-4">
          <label htmlFor="pageSize" className="font-medium">
            Items per page:
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1); // to reset to first page when page size changes
            }}
            className="border rounded px-2 py-1"
          >
            {[10, 15, 25, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        {/* Header row */}
        <div className="grid grid-cols-6 p-2 border-2 border-gray-200 rounded-lg font-semibold">
          <span>No</span>
          <span>Date</span>
          <span>Username</span>
          <span className="col-span-3">Description</span>
        </div>

        {/* Paged rows */}
        {pagedLogs.map((item, index) => (
          <div
            key={startIndex + index}
            className="grid grid-cols-6 p-2 border-2 border-gray-200 rounded-lg"
          >
            <span>{startIndex + index + 1}</span>
            <span>{moment(item.creationDate).fromNow()}</span>
            <span>{item.userName}</span>
            <span className="col-span-3">{item.description}</span>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default SystemLogsPage;
