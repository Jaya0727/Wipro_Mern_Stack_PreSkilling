import java.util.Scanner;

class BankAccount {
    private double balance;

    public BankAccount(double bal) {
        balance = bal;
    }

    public void deposit(double amount) {
        balance += amount;
    }

    public void withdraw(double amount) {
        balance -= amount;
    }

    public double getBalance() {
        return balance;
    }
}

class LoanAccount {
    private double loanAmount;

    public LoanAccount(double loan) {
        loanAmount = loan;
    }

    public double calculateEMI() {
        return loanAmount / 12;
    }

    public void payEMI(String mode) {
        System.out.println("EMI paid using " + mode);
    }
}

public class Main {   // FILE NAME MUST BE Main.java
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        BankAccount acc = new BankAccount(5000);
        acc.deposit(2000);
        acc.withdraw(1000);
        System.out.println("Balance: " + acc.getBalance());

        LoanAccount loan = new LoanAccount(12000);
        System.out.println("Monthly EMI: " + loan.calculateEMI());

        System.out.print("Enter payment mode (Cash/Card): ");
        String mode = sc.next();
        loan.payEMI(mode);
    }
}