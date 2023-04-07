package jp.alhinc.testtraining;

public class CheckDigitCreditCard {
	public static boolean validation(long credit_number) {
		return (sizecheck(credit_number) >= 14 && sizecheck(credit_number) <= 16 &&
				(prefixcheck(credit_number, 4) || prefixcheck(credit_number, 5) ||
						prefixcheck(credit_number, 37) || prefixcheck(credit_number, 6))
				&&
				(sumOfEven(credit_number) + sumOfOdd(credit_number)) % 10 == 0);
	}

	public static int sizecheck(long c_num) {
		String num = Long.toString(c_num);
		return num.length();
	}

	public static boolean prefixcheck(long c_num, int d) {
		return getprefix(c_num, sizecheck(d)) == d;
	}

	public static long getprefix(long c_num, int k) {
		if (sizecheck(c_num) > k) {
			String num = Long.toString(c_num);
			return Long.parseLong(num.substring(0, k));
		}
		return c_num;
	}

	public static int sumOfOdd(long c_num) {
		int sum = 0;
		String num = Long.toString(c_num);
		for (int i = sizecheck(c_num) - 1; i >= 0; i -= 2) {
			sum += Integer.parseInt(String.valueOf(num.charAt(i)));
		}
		return sum;
	}

	public static int sumOfEven(long c_num) {
		int sum = 0;
		String num = Long.toString(c_num);
		for (int i = sizecheck(c_num) - 2; i >= 0; i -= 2) {
			sum += getDigit(Integer.parseInt(String.valueOf(num.charAt(i))) * 2);
		}
		return sum;
	}

	public static int getDigit(int num) {
		if (num < 10)
			return num;
		return num / 10 + num % 10;
	}

	public static void main(String[] args) {
		try {
			if (args.length == 0) {
				System.out.print("引数が存在しません");
				return;
			}

			long credit_number = Long.parseLong(args[0]);

			if (!validation(credit_number)) {
				System.out.print("クレジットカードとして有効ではない値です。");
				return;
			}
			if (prefixcheck(credit_number, 4)) {
				System.out.print("入力された値はVISAです。");
			} else if (prefixcheck(credit_number, 5)) {
				System.out.print("入力された値はマスターカードです。");
			} else if (prefixcheck(credit_number, 6)) {
				System.out.print("入力された値はディスカバーカードです。");
			} else if (prefixcheck(credit_number, 37)) {
				System.out.print("入力された値はアメリカン・エキスプレスです。");
			} else {
				// 処理が通らない想定 バリデーションにて4,5,6,37のチェックを行っているため
				System.out.print("入力された値のカード会社は存在しません。");
			}
		} catch (Exception e) {
			System.out.print("入力された値が数値ではありません。");
		}
	}
}
