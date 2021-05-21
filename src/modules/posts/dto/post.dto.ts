import { IsNotEmpty, IsNumber } from "class-validator";

export class ApiResponse {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export class CreatePost {
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    body: string;
}

export class UpdatePost {
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    body: string;
}

export class PatchPost {
    userId?: number;
    title?: string;
    body?: string;
}