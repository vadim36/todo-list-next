import { RefreshToken } from "@prisma/client";

export default class RefreshTokenModel implements RefreshToken {
  tokenId: string;
  tokenBody: string;
  userId: string;
}