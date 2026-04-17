import type { IPaginationParams } from "../interface/IPagination.ts";

/**
 * Extrae y valida la pagiancion
 * @param {object} query - req.query,
 * @param {number} maxPageSize
 * @returns {{page, pageSize, limit, offset}}
 * */
export function getPagination(
  query: Record<string, any>,
  maxPageSize = 100,
): IPaginationParams {
  const page = Math.max(1, parseInt(query.page || "1", 10) || 1);
  const pageSize = Math.min(
    maxPageSize,
    Math.max(1, parseInt(query.pageSize || "10", 10) || 10),
  );
  return { page, pageSize, limit: pageSize, offset: (page - 1) * pageSize };
}

export function paginatedResponse(
  { rows, count }: { rows: any[]; count: number },
  page: number,
  pageSize: number,
) {
  return {
    total: count,
    page,
    pageSize,
    totalPages: Math.ceil(count / pageSize),
    data: rows,
  };
}
