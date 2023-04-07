package method_drill;

import static org.junit.Assert.*;
import org.junit.Test;

public class Question07Test {

    @Test
    public void test01_第2引数isKidがfalseのとき_さん付で返却() {
        String msg = Question07.getMessage("Mike", false);
        String expect = "こんにちは。Mikeさん";
        assertEquals(msg, expect);
    }

    @Test
    public void test02_第2引数isKidがtrueのとき_ちゃん付で返却() {
        String msg = Question07.getMessage("Mike", true);
        String expect = "こんにちは。Mikeちゃん";
        assertEquals(msg, expect);
    }

}
