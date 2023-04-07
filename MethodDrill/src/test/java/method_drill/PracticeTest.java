/**
 *
 */
package method_drill;

import static org.junit.Assert.*;
import org.junit.Test;

/**
 * @author admin0467
 *
 */
public class PracticeTest {

    /**
     * {@link method_drill.Practice#main(java.lang.String[])} のためのテスト・メソッド。
     */
    @Test
    public void main() {
        double num1 = 12.5;
        double num2 = 7.5;
        double expect = num1 * num2 / 2;
        double triArea = Practice.getTriangleArea(num1, num2);
        assertEquals(triArea, expect, 0.0);
    }

}
