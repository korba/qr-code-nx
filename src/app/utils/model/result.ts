export interface IResult<T> {
    data: T | undefined;
    errorMsg?: string;
}