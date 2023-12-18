import {AxiosError} from "axios";

interface ApiResponse {
  message?: string;
}

class ApiErrorHelper {
  private axiosError: AxiosError | undefined;
  private errorMessage: string = "";

  constructor(error: unknown) {
    if (error instanceof Error) {
      this.axiosError = error as AxiosError;
    } else {
      this.errorMessage = error as string;
    }
  }

  getErrorMessage(): string {
    if (
      this.axiosError &&
      this.axiosError.response?.data &&
      typeof this.axiosError.response.data === "object"
    ) {
      const responseData = this.axiosError.response.data as ApiResponse;
      return responseData.message || "Something went wrong";
    } else if (this.errorMessage) {
      return this.errorMessage;
    }

    return "Something went wrong";
  }
}

export default ApiErrorHelper;
