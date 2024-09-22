export interface BankCode {
  /**
   * ธนาคารกรุงเทพ
   */
  BBL: "002";
  /**
   * ธนาคารกสิกรไทย
   */
  KBANK: "004";
  /**
   * ธนาคารกรุงไทย
   */
  KTB: "006";
  /**
   * ธนาคารทหารไทยธนชาต
   */
  TTB: "011";
  /**
   * ธนาคารไทยพาณิชย์
   */
  SCB: "014";
  /**
   * ธนาคารกรุงศรีอยุธยา
   */
  BAY: "025";
  /**
   * ธนาคารเกียรตินาคินภัทร
   */
  KKP: "069";
  /**
   * ธนาคารซีไอเอ็มบีไทย
   */
  CIMBT: "022";
  /**
   * ธนาคารทิสโก้
   */
  TISCO: "067";
  /**
   * ธนาคารยูโอบี
   */
  UOBT: "024";
  /**
   * ธนาคารไทยเครดิตเพื่อรายย่อย
   */
  TCD: "071";
  /**
   * ธนาคารแลนด์ แอนด์ เฮ้าส์
   */
  LHFG: "073";
  /**
   * ธนาคารไอซีบีซี (ไทย)
   */
  ICBCT: "070";
  /**
   * ธนาคารพัฒนาวิสาหกิจขนาดกลางและขนาดย่อมแห่งประเทศไทย
   */
  SME: "098";
  /**
   * ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร
   */
  BAAC: "034";
  /**
   * ธนาคารเพื่อการส่งออกและนำเข้าแห่งประเทศไทย
   */
  EXIM: "035";
  /**
   * ธนาคารออมสิน
   */
  GSB: "030";
  /**
   * ธนาคารอาคารสงเคราะห์
   */
  GHB: "033";
}

export type BankAccount = {
  /**
   * The name to display in Thai or English depends on the issuer bank payslip
   * - The data might not be complete need partial match
   */
  displayName: string;
  /**
   * The name to display in English\n
   * - The data might not be complete need partial match
   */
  name: string;
  proxy: {
    /**
     * From proxy type
     */
    type: "NATID" | "MSISDN" | "EWALLETID" | "EMAIL" | "BILLERID";
    /**
     * From proxy value
     * - The value is always masked.
     */
    value: string;
  };
  account: {
    /**
     * From account type
     */
    type: "BANKAC" | "TOKEN" | "DUMMY";
    /**
     * From account value
     * - The value is always masked.
     */
    value: string;
  };
};

export type SlipCheckRequest = (
  | {
      /**
       * ค่าที่อ่านได้จาก qr code ขวาล่างของสลิป
       */
      data: string;
    }
  | {
      /**
       * รูปภาพสลิป รองรับแค่นามสกุล JPG, JPEG, PNG, JFIF หรือ WEBP
       */
      files: string;
    }
  | {
      /**
       * url ของรูปภาพสลิป (ถ้าหากเป็น link google drive / signed s3 อาจจะไม่สามรถใช้ได้)
       */
      url: string;
    }
) & {
  /**
   * ระบุเป็น true ถ้าต้องการเช็คธนาคารรับเงินที่ผูกไว้กับสาขา API และเก็บยอดไว้ดูใน Line LIFF ของร้านค้าเพื่อตรวจสลิปซ้ำได้ ถ้าหากระบุเป็น false หรือไม่ส่งจะเป็นการตรวจสลิปเฉย ๆ ไม่มีการเก็บค่า และไม่ตรวจสลิปซ้ำ
   */
  log?: boolean;
  /**
   * ระบุยอดเงินไว้สำหรับเช็คกับยอดเงินในสลิป
   */
  amount?: number;
};

export type SlipCheckInnerResponse = {
  /**
   * Valid QR code
   */
  success: boolean;
  /**
   * Verification Message
   */
  message: string;
  /**
   * Language (EN, TH)
   */
  language?: "EN" | "TH";
  /**
   * Receiving bank code
   */
  receivingBank: BankCode[keyof BankCode];
  /**
   * Sender bank code
   */
  sendingBank: BankCode[keyof BankCode];
  /**
   * Transaction reference number contains reference number of the transaction required to verify the payslip
   */
  transRef: string;
  /**
   * Transaction date text. This field contains the date on the payslip in ‘yyyyMMdd’ format
   */
  transDate: string;
  /**
   * Transaction time text. This field contains time on the payslip in ‘HH:mm:ss’ format
   */
  transTime: string;
  /**
   * Transaction timestamp text. This field contains the timestamp on the payslip in ‘YYYY-MM-DDTHH:mm:ss.sssZ’ format which is ISO 8601
   */
  transTimestamp: string;
  sender?: BankAccount;
  receiver: BankAccount;
  /**
   * This field contains amount on the payslip
   */
  amount: number;
  /**
   * Paid local amount
   */
  paidLocalAmount?: number;
  /**
   * Paid local currency
   */
  paidLocalCurrency?: string;
  /**
   * Country code
   */
  countryCode: string;
  /**
   * Transaction fee amount
   */
  transFeeAmount?: string;
  /**
   * 1st Reference number on the payslip
   */
  ref1?: string;
  /**
   * 2nd Reference number on the payslip
   */
  ref2?: string;
  /**
   * 3rd Reference number on the payslip
   */
  ref3?: string;
  /**
   * To merchant ID
   */
  toMerchantId?: string;
};

export type SLIP_CHECK_ERROR_CODE =
  | 1000
  | 1001
  | 1002
  | 1003
  | 1004
  | 1005
  | 1006
  | 1007
  | 1008
  | 1009
  | 1010
  | 1011
  | 1012
  | 1013
  | 1014;

export type SlipCheckResponse =
  | {
      code: SLIP_CHECK_ERROR_CODE;
      message: string;
    }
  | {
      code: 1010;
      message: string;
      data: {
        qrcodeData: string;
        bankCode: string;
        bankName: string;
        delay: number;
      };
    }
  | {
      code: 1012;
      message: string;
      data: SlipCheckInnerResponse;
    }
  | {
      code: 1013;
      message: string;
      data: SlipCheckInnerResponse;
    }
  | {
      code: 1014;
      message: string;
      data: SlipCheckInnerResponse;
    }
  | {
      /**
       * Request success
       */
      success: false;
      data?: unknown;
    }
  | {
      /**
       * 	Request success
       */
      success: true;
      data: SlipCheckInnerResponse;
    };

export type SlipCheckQuotaResponse =
  | {
      /**
       * Request success
       */
      success: false;
      data?: unknown;
    }
  | {
      /**
       * Request success
       */
      success: true;
      data: {
        /**
         * จำนวนโควต้าคงเหลือ
         * - กรณีไม่ได้ส่ง log: true
         * จะคิดโควต้าก็ต่อเมื่อสลิปถูกต้อง แต่การส่งซ้ำก็คิดโควต้าเช่นเดียวกัน
         * - กรณีส่ง log: true
         * จะคิดโควต้าก็ต่อเมื่อสลิปถูกต้องและตรงกับบัญชีผู้รับที่ตั้งไว้ใน Line LIFF การส่งซ้ำจะไม่คิดโควต้า แต่ถ้าหากบัญชีผู้รับที่ตั้งไว้ไม่ตรงก็จะคิดโควต้าเช่นเดียวกัน
         */
        quota: number;
        /**
         * จำนวนโควต้าที่ใช้เกิน
         */
        overQuota: number;
      };
    };
