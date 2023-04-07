package method_drill;

import static org.junit.Assert.*;
import org.junit.Test;

public class Question09Test {


    @Test
    public void test01_最も長い文字列を返却する() {
        String[] arrays =
                {"Justin", "Selena", "Rita", "Katy", "AlanSanMaximan"};
        String answer = Question09.getLongestString(arrays);
        String expect = "AlanSanMaximan";
        assertEquals(answer, expect);
    }

    @Test
    public void test02_最も長い文字列の内後方にあるものを返却する() {
        String[] arrays = {"Justin", "Selena", "Rita", "Katy", "Hugo"};
        String answer = Question09.getLongestString(arrays);
        String expect = "Selena";
        assertEquals(answer, expect);
    }

}
