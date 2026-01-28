abstract class PaymentMethod
{
    abstract void payEMI(double amount);
    
}
class CashPayment extends PaymentMethod
{
    void payEMI(double amount)
    {
        System.out.println("EMI of Rs " + amount + " is paid using Cash");
    }
}
class CardPayment extends PaymentMethod
{
    void payEMI(double amount)
    {
        System.out.println("EMI of RS " + amount+ " is paid using card");
    }
}
//Encapsulation
class BankAccount
{
    private double balance;
    BankAccount(double balance)
    {
        this.balance = balance;
    }
    void deposit(double amount)
    {
        balance+=amount;
        System.out.println("Deposited Rs: " + amount);
    }
    void withdraw(double amount)
    {
        if(amount <= balance)
        {
            balance -= amount;
            System.out.println("Withdrawn Rs: " + amount);
        }
        else{
            System.out.println("Insufficient balance");
        }
    }
    double getBalance()
    {
        return balance;
    }
}
// Inheritance
class LoanAccount extends BankAccount
{
    LoanAccount(double balance)
    {
        super(balance);
    }
    double calculateEMI(double laonAmount, int months)
    {
        return laonAmount / months;
    }
}
public class BankAccount{
    public static void main(String[] args) {
        LoanAccount acc = new LoanAccount(10000);
        acc.deposit(2000);
        acc.withdraw((1000));
        System.out.println("Current Balance : Rs" + acc.getBalance() );
        double laonAmount = 12000;
        int months = 12;
        double emi = acc.calculateEMI(laonAmount, months);
        System.out.println("Monthly EMI: " + emi);
        PaymentMethod payment;
        payment = new CashPayment();
        payment.payEMI(emi);
        payment = new CardPayment();
        payment.payEMI(emi);
    }
    
}