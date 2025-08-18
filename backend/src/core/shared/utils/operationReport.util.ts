export interface DeleteReport {
    deleted: number[];
    notFound: number[];
    alreadyInactive: number[];
}

export class OperationReportUtil {
    static summarizeDelete(report: DeleteReport) {
        const total: number = report.deleted.length + report.notFound.length + report.alreadyInactive.length;

        if (report.deleted.length === total) {
            return { status: "ALL_DELETED" as const };
        }

        if (report.notFound.length === total) {
            return { status: "NONE_FOUND" as const };
        }

        if (report.alreadyInactive.length === total) {
            return { status: "ALL_ALREADY_INACTIVE" as const };
        }

        return { status: "PARTIAL" as const };
    }
}
