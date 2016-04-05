
function Validation()
{
	var eno = document.getElementById("employeeCode").value;
	var ename = document.getElementById("employeeName").value;
	var gender = document.getElementsByName('gender');
	var dept = document.getElementById("department");
	var ownsVeh = document.getElementById("ownsVehicle").checked;
	var basic = Number(document.getElementById("basic").value);
	var da = Number(document.getElementById("da").value);
	var hra = Number(document.getElementById("hra").value);
	var pf = Number(document.getElementById("pf").value);
	var flag = true;
	if (eno == "")
	{
		document.getElementById("codep").style.display = "block";
		flag = false;
	}
	if (ename == "")
	{
		document.getElementById("namep").style.display = "block";
		flag = false;
	}
	if (basic == "")
	{
		document.getElementById("basicp").style.display = "block";
		flag = false;
	}
	else
	{
		if (isNaN(basic))
		{
			document.getElementById("basicvp").style.display = "block";
			flag = false;
		}
	}
	if (hra == "")
	{
		document.getElementById("hrap").style.display = "block";
		flag = false;
	}
	else
	{
		if (isNaN(hra))
		{
			document.getElementById("hravp").style.display = "block";
			flag = false;
		}
	}
	if (da == "")
	{
		document.getElementById("dap").style.display = "block";
		flag = false;
	}
	else
	{
		if (isNaN(da))
		{
			document.getElementById("davp").style.display = "block";
			flag = false;
		}
	}
	if (pf == "")
	{
		document.getElementById("pfp").style.display = "block";
		flag = false;
		
	}
	else
	{
		if (isNaN(pf))
		{
			document.getElementById("pfvp").style.display = "block";
			flag = false;
		}
	}
	
	if (!(gender[0].checked || gender[1].checked || gender[2].checked))
	{
		document.getElementById("genderp").style.display = "block";
		flag = false;
	}
	
	if(flag)
	{
		if(confirm("Do you want to calculate?"))
		{
			calculateSalary(eno,ename,gender,dept,ownsVeh,basic,hra,da,pf);
		}
		else
		{
			return false;
		}	
	}
	else
	{
		return false;
	}
}
function calculateSalary(eno,ename,gender,dept,ownsVeh,basic,hra,da,pf)
{		
	
		
			/* display page */
			document.getElementById("eCodeDiv").innerHTML = eno;

			if(gender[0].checked)
			{
			ename = "Mr. " + ename;
			}
			else if(gender[1].checked)
			{
			ename = "Ms. " + ename;
			}
			document.getElementById("eNameDiv").innerHTML = ename;

			document.getElementById("depDiv").innerHTML = dept.options[dept.selectedIndex].value;

			if(ownsVeh)
			{
			document.getElementById("vehDiv").innerHTML = 'Has Vehicle';
			}
			else
			{
			document.getElementById("vehDiv").innerHTML = 'Does not have Vehicle';
			}

			var pa=0;

			if (ownsVeh)
			{
			pa=100;
			}

			var daAmt = (basic * da)/100;
			var hraAmt = (basic * hra)/100;
			var pfAmt = (basic * pf)/100;
			var salary = basic + daAmt + hraAmt + pa - pfAmt;

			salary = salary.toFixed(2);
			basic = basic.toFixed(2);
			daAmt = daAmt.toFixed(2);
			hraAmt = hraAmt.toFixed(2);
			pfAmt = pfAmt.toFixed(2);
			pa = pa.toFixed(2);

			document.getElementById("basicDiv").innerHTML = basic + ' $';
			document.getElementById("daDiv").innerHTML = daAmt + ' $';
			document.getElementById("hraDiv").innerHTML = hraAmt + ' $';
			document.getElementById("paDiv").innerHTML = pa + ' $';
			document.getElementById("pfDiv").innerHTML = pfAmt + ' $';
			document.getElementById("netSalaryDiv").innerHTML = salary + ' $';

			document.getElementById("daLabel").innerHTML = 'DA @ '+ da + '%:';
			document.getElementById("hraLabel").innerHTML = 'HRA @ '+ hra + '%:';
			document.getElementById("pfLabel").innerHTML = 'PF @ '+ pf + '%:';

			document.getElementById("input").style.display = "none";
			document.getElementById("result").style.display = "block";
		
			
	
		
}

function back()
{
	document.getElementById("input").style.display = "block";
	document.getElementById("result").style.display = "none";
}
	