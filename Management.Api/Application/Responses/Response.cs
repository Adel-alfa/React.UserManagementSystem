namespace Management.Api.Application.Responses
{
    public class Response<T>
    {
        public bool Success { get; set; } = true;

        public string Message { get; set; } = string.Empty;

        public List<string> Errors { get; set; } = new();

        public T? Data { get; set; }
        
        public static Response<T> Ok(T data, string message = "")
            => new Response<T> { Success = true, Data = data, Message = message };

        public static Response<T> Fail(string message, List<string>? errors = null)
            => new Response<T>
            {
                Success = false,
                Message = message,
                Errors = errors ?? new List<string>()
            };

        public static Response<T> ValidationFail(List<string> validationErrors)
            => new Response<T>
            {
                Success = false,
                Message = "Validation failed",
                Errors = validationErrors
            };
    }

}
