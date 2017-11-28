import { User } from "oidc-client";

export default interface UserObserver {
    userChanged(user: User): void;
}
