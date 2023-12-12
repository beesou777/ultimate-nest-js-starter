import { createParamDecorator } from "@nestjs/common";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";

export const GetUser = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContextHost) => {
        const request: Express.Request =
            ctx.switchToHttp()
                .getRequest()
        if (data) {
            return request.user[data]
        }

        return request.user
    }
)